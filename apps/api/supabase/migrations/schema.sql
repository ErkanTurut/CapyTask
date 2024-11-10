
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "private";

ALTER SCHEMA "private" OWNER TO "postgres";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_hashids" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";

CREATE TYPE "public"."LocationType" AS ENUM (
    'BUILDING',
    'FLOOR',
    'ROOM',
    'AREA',
    'OTHER'
);

ALTER TYPE "public"."LocationType" OWNER TO "postgres";

CREATE TYPE "public"."NoteType" AS ENUM (
    'STATUS_CHANGE',
    'COMMENT',
    'DELAY_NOTIFICATION',
    'RESOURCE_REQUEST',
    'CUSTOMER_COMMUNICATION',
    'INTERNAL_COMMUNICATION'
);

ALTER TYPE "public"."NoteType" OWNER TO "postgres";

CREATE TYPE "public"."Permission" AS ENUM (
    'CREATE',
    'READ',
    'UPDATE',
    'DELETE'
);

ALTER TYPE "public"."Permission" OWNER TO "postgres";

CREATE TYPE "public"."Priority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH'
);

ALTER TYPE "public"."Priority" OWNER TO "postgres";

CREATE TYPE "public"."Status" AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'COMPLETED',
    'ON_HOLD',
    'CANCELED'
);

ALTER TYPE "public"."Status" OWNER TO "postgres";

CREATE TYPE "public"."WorkOrderSource" AS ENUM (
    'MAINTENANCE_PLAN',
    'AI_CHAT',
    'AI_VOICE_ASSISTANT',
    'MANUAL_ENTRY',
    'OTHER'
);

ALTER TYPE "public"."WorkOrderSource" OWNER TO "postgres";

CREATE TYPE "public"."WorkOrderType" AS ENUM (
    'INSPECTION',
    'MAINTENANCE',
    'OTHER'
);

ALTER TYPE "public"."WorkOrderType" OWNER TO "postgres";

CREATE TYPE "public"."role" AS ENUM (
    'ADMIN',
    'MANAGER',
    'SUPERVISOR',
    'TECHNICIAN',
    'ENGINEER',
    'QUALITY_INSPECTOR',
    'OPERATOR',
    'OTHER'
);

ALTER TYPE "public"."role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."embed"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  content_column text = TG_ARGV[0];
  embedding_column text = TG_ARGV[1];
  batch_size int = case when array_length(TG_ARGV, 1) >= 3 then TG_ARGV[2]::int else 5 end;
  timeout_milliseconds int = case when array_length(TG_ARGV, 1) >= 4 then TG_ARGV[3]::int else 5 * 60 * 1000 end;
  batch_count int = ceiling((select count(*) from inserted) / batch_size::float);
begin
  -- Loop through each batch and invoke an edge function to handle the embedding generation
  for i in 0 .. (batch_count-1) loop
  perform
    net.http_post(
      url := supabase_url() || '/functions/v1/embed',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', current_setting('request.headers')::json->>'authorization'
      ),
      body := jsonb_build_object(
        'ids', (select json_agg(ds.id) from (select id from inserted limit batch_size offset i*batch_size) ds),
        'table', TG_TABLE_NAME,
        'contentColumn', content_column,
        'embeddingColumn', embedding_column
      ),
      timeout_milliseconds := timeout_milliseconds
    );
  end loop;

  return null;
end;
$$;

ALTER FUNCTION "private"."embed"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_available_time_slots"("schedule_range" "tstzrange", "unavailable_time_slots" "jsonb") RETURNS TABLE("id" integer, "available_time_slots" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    slot jsonb;
    time_slot jsonb;
    temp_range tstzrange;
    current_range tstzrange;
    available_slots jsonb;
    slot_start timestamp with time zone;
    slot_end timestamp with time zone;
    available_start timestamp with time zone;
    available_end timestamp with time zone;
BEGIN
    -- Iterate over each item in the JSON array
    FOR slot IN
        SELECT * FROM jsonb_array_elements(unavailable_time_slots)
    LOOP
        -- Extract ID
        id := (slot->>'id')::INT;

        -- Initialize available slots for this ID
        available_slots := '[]'::jsonb;
        current_range := schedule_range;

        -- Process each time slot for the current ID
        FOR time_slot IN
            SELECT * FROM jsonb_array_elements(slot->'time_slots')
        LOOP
            -- Convert the JSON time slots to timestamps
            slot_start := (time_slot->>0)::timestamp with time zone;
            slot_end := (time_slot->>1)::timestamp with time zone;
            temp_range := tstzrange(slot_start, slot_end);

            -- Handle overlapping time slots
            IF current_range && temp_range THEN
                -- Generate left range before overlap
                IF lower(current_range) < lower(temp_range) THEN
                    available_start := lower(current_range);
                    available_end := lower(temp_range);
                    available_slots := jsonb_set(
                        available_slots, 
                        '{-1}', 
                        (available_slots->-1 || jsonb_build_array(available_start, available_end))::jsonb
                    );
                END IF;

                -- Adjust the current range to the remaining part after the overlap
                IF upper(temp_range) < upper(current_range) THEN
                    current_range := tstzrange(upper(temp_range), upper(current_range));
                ELSE
                    -- If the temp range covers the current range, set current range to NULL
                    current_range := NULL;
                END IF;
            END IF;
        END LOOP;

        -- If there's any part of the current range left, add it to available slots
        IF current_range IS NOT NULL AND lower(current_range) < upper(current_range) THEN
            available_start := lower(current_range);
            available_end := upper(current_range);
            available_slots := jsonb_set(
                available_slots, 
                '{-1}', 
                (available_slots->-1 || jsonb_build_array(available_start, available_end))::jsonb
            );
        END IF;

        -- Return the available slots for the current ID
        RETURN NEXT;
    END LOOP;
END;
$$;

ALTER FUNCTION "public"."get_available_time_slots"("schedule_range" "tstzrange", "unavailable_time_slots" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_team"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.user_team(user_id, team_id)
  values (auth.uid(), new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_team"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.user (id,email)
  values (new.id , new.email);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_workspace"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.user_workspace(user_id, workspace_id)
  values (auth.uid(), new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_workspace"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_work_plan"("_work_plan_template_id" "text", "_team_id" "text") RETURNS TABLE("work_plan_id" "text", "name" "text", "team_id" "text", "work_plan_template_id" "text", "description" "text", "created_at" timestamp with time zone, "updated_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    work_plan_template RECORD;
    work_plan RECORD;
BEGIN
    -- Fetch work_plan_template by id
    SELECT * INTO work_plan_template
    FROM work_plan_template wpt
    WHERE wpt.id = _work_plan_template_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Work plan template not found';
    END IF;

    -- Fetch work_plan by work_plan_template_id and created_at
    SELECT * INTO work_plan
    FROM work_plan wp
    WHERE wp.work_plan_template_id = _work_plan_template_id
    AND wp.created_at = work_plan_template.updated_at;

    -- If work_plan is not found, insert a new one
    IF NOT FOUND THEN
        INSERT INTO work_plan (
            name, team_id, work_plan_template_id, description,
            created_at, updated_at
        ) VALUES (
            work_plan_template.name, _team_id, work_plan_template.id,
            work_plan_template.description, work_plan_template.updated_at,
            work_plan_template.updated_at
        )
        RETURNING * INTO work_plan;
    END IF;

    -- Return the final work_plan
    RETURN QUERY
    SELECT wp.id, wp.name, wp.team_id,
           wp.work_plan_template_id, wp.description,
           wp.created_at, wp.updated_at
    FROM work_plan wp
    WHERE wp.id = work_plan.id;
END;
$$;

ALTER FUNCTION "public"."manage_work_plan"("_work_plan_template_id" "text", "_team_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_work_step"("_work_plan_id" "text", "_work_plan_template_id" "text") RETURNS TABLE("work_step_id" "text", "name" "text", "description" "text", "step_order" integer, "work_step_template_id" "text", "parent_step_id" "text", "work_plan_id" "text")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    work_step RECORD;
    work_step_template RECORD;
    work_step_exists BOOLEAN;
BEGIN
    -- Check if there are already work steps related to the work plan
    SELECT TRUE INTO work_step_exists
    FROM work_step ws
    WHERE ws.work_plan_id = _work_plan_id
    LIMIT 1;

    IF work_step_exists THEN
        -- Return existing work steps
        RETURN QUERY
        SELECT ws.id, ws.name, ws.description, ws.step_order, ws.work_step_template_id,
               ws.parent_step_id, ws.work_plan_id
        FROM work_step ws
        WHERE ws.work_plan_id = _work_plan_id;
    ELSE
        -- Fetch work_step_template by work_plan_template_id
        FOR work_step_template IN
            SELECT *
            FROM work_step_template wst
            WHERE wst.work_plan_template_id = _work_plan_template_id
        LOOP
            -- Insert new work steps based on the templates
            INSERT INTO work_step (
                name, description, step_order, work_step_template_id, parent_step_id, work_plan_id
            ) VALUES (
                work_step_template.name, work_step_template.description,
                work_step_template.step_order, work_step_template.id,
                work_step_template.parent_step_id, _work_plan_id
            )
            RETURNING * INTO work_step;

            -- Return the inserted work step
            RETURN QUERY
            SELECT work_step.id, work_step.name, work_step.description,
                   work_step.step_order, work_step.work_step_template_id,
                   work_step.parent_step_id, work_step.work_plan_id;
        END LOOP;
    END IF;
END;
$$;

ALTER FUNCTION "public"."manage_work_step"("_work_plan_id" "text", "_work_plan_template_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_work_step_item"("_work_plan_id" "text", "_work_order_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    work_step RECORD;
    existing_status RECORD;
BEGIN
    -- Fetch work steps related to the work plan
    FOR work_step IN
        SELECT ws.id, ws.step_order
        FROM work_step ws
        WHERE ws.work_plan_id = _work_plan_id
    LOOP
        -- Insert the work step item without checking for conflict
        INSERT INTO work_step_item (
            work_step_id, work_order_id, step_order
        ) VALUES (
            work_step.id, _work_order_id, work_step.step_order
        );
    END LOOP;
END;
$$;

ALTER FUNCTION "public"."manage_work_step_item"("_work_plan_id" "text", "_work_order_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."nanoid"("size" integer DEFAULT 21, "alphabet" "text" DEFAULT '_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'::"text", "additionalbytesfactor" double precision DEFAULT 1.6) RETURNS "text"
    LANGUAGE "plpgsql" PARALLEL SAFE
    AS $$
DECLARE
    alphabetArray  text[];
    alphabetLength int := 64;
    mask           int := 63;
    step           int := 34;
BEGIN
    IF size IS NULL OR size < 1 THEN
        RAISE EXCEPTION 'The size must be defined and greater than 0!';
    END IF;

    IF alphabet IS NULL OR length(alphabet) = 0 OR length(alphabet) > 255 THEN
        RAISE EXCEPTION 'The alphabet can''t be undefined, zero or bigger than 255 symbols!';
    END IF;

    IF additionalBytesFactor IS NULL OR additionalBytesFactor < 1 THEN
        RAISE EXCEPTION 'The additional bytes factor can''t be less than 1!';
    END IF;

    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);
    mask := (2 << cast(floor(log(alphabetLength - 1) / log(2)) as int)) - 1;
    step := cast(ceil(additionalBytesFactor * mask * size / alphabetLength) AS int);

    IF step > 1024 THEN
        step := 1024; -- The step size % can''t be bigger then 1024!
    END IF;

    RETURN nanoid_optimized(size, alphabet, mask, step);
END
$$;

ALTER FUNCTION "public"."nanoid"("size" integer, "alphabet" "text", "additionalbytesfactor" double precision) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) RETURNS "text"
    LANGUAGE "plpgsql" PARALLEL SAFE
    AS $$
DECLARE
    idBuilder      text := '';
    counter        int  := 0;
    bytes          bytea;
    alphabetIndex  int;
    alphabetArray  text[];
    alphabetLength int  := 64;
BEGIN
    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);

    LOOP
        bytes := extensions.gen_random_bytes(step);
        FOR counter IN 0..step - 1
            LOOP
                alphabetIndex := (get_byte(bytes, counter) & mask) + 1;
                IF alphabetIndex <= alphabetLength THEN
                    idBuilder := idBuilder || alphabetArray[alphabetIndex];
                    IF length(idBuilder) = size THEN
                        RETURN idBuilder;
                    END IF;
                END IF;
            END LOOP;
    END LOOP;
END
$$;

ALTER FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."remove_overlaps"("main_range" "tstzrange", "other_ranges" "tstzrange"[]) RETURNS TABLE("result_range" "tstzrange")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    current_range tstzrange;
    temp_range tstzrange;
BEGIN
    -- Initialize the current range with the main range
    current_range := main_range;

    -- Iterate through each range in the array
    FOREACH temp_range IN ARRAY other_ranges
    LOOP
        -- Skip the intersection and move to the next non-overlapping range
        IF current_range && temp_range THEN
            -- Generate left range before overlap
            IF lower(current_range) < lower(temp_range) THEN
                result_range := tstzrange(lower(current_range), lower(temp_range));
                RETURN NEXT;
            END IF;

            -- Adjust the current range to the remaining part after the overlap
            IF upper(temp_range) < upper(current_range) THEN
                current_range := tstzrange(upper(temp_range), upper(current_range));
            ELSE
                -- If the temp range covers the current range, exit the loop
                RETURN;
            END IF;
        END IF;
    END LOOP;

    -- If there's any part of the current range left after processing all other ranges, return it
    IF lower(current_range) < upper(current_range) THEN
        result_range := current_range;
        RETURN NEXT;
    END IF;
END;
$$;

ALTER FUNCTION "public"."remove_overlaps"("main_range" "tstzrange", "other_ranges" "tstzrange"[]) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_work_plan_template_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE work_plan_template
        SET updated_at = now()
        WHERE id = OLD.work_plan_template_id;
    ELSE
        UPDATE work_plan_template
        SET updated_at = now()
        WHERE id = NEW.work_plan_template_id;
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_work_plan_template_updated_at"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."upsert_work_order_assets"("_work_order_id" "text", "_assets" "jsonb") RETURNS TABLE("work_order_asset_id" "text", "asset_id" "text", "work_order_id" "text", "created_at" timestamp with time zone, "updated_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    asset RECORD;
BEGIN
    FOR asset IN
        SELECT * FROM jsonb_to_recordset(_assets) AS (
            asset_id TEXT
        )
    LOOP
        INSERT INTO work_order_asset (
            asset_id, work_order_id
        ) VALUES (
            asset.asset_id, _work_order_id
        )
        ON CONFLICT (asset_id, work_order_id) DO UPDATE SET
            asset_id = EXCLUDED.asset_id
        RETURNING id, asset_id, work_order_id, created_at, updated_at
        INTO asset;
        RETURN QUERY SELECT asset.*;   
    END LOOP;
END;
$$;

ALTER FUNCTION "public"."upsert_work_order_assets"("_work_order_id" "text", "_assets" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."upsert_work_steps"("_work_plan_id" "text", "_steps" "jsonb") RETURNS TABLE("work_step_id" "text", "name" "text", "description" "text", "step_order" integer, "work_step_template_id" "text", "parent_step_id" "text", "work_plan_id" "text", "created_at" timestamp with time zone, "updated_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    step RECORD;
BEGIN
    FOR step IN
        SELECT * FROM jsonb_to_recordset(_steps) AS (
            name TEXT,
            description TEXT,
            step_order INTEGER,
            work_step_template_id TEXT,
            parent_step_id TEXT
        )
    LOOP
        INSERT INTO work_step (
            work_plan_id, name, description, step_order, 
            work_step_template_id, parent_step_id
        ) VALUES (
            _work_plan_id, step.name, step.description, step.step_order, 
            step.work_step_template_id, step.parent_step_id
        )
        ON CONFLICT (work_plan_id, name) DO UPDATE SET
            description = EXCLUDED.description,
            step_order = EXCLUDED.step_order,
            work_step_template_id = EXCLUDED.work_step_template_id,
            parent_step_id = EXCLUDED.parent_step_id
        RETURNING id, name, description, step_order, 
                  work_step_template_id, parent_step_id, 
                  work_plan_id, created_at, updated_at
        INTO step;
        RETURN QUERY SELECT step.*;   
    END LOOP;
END;
$$;

ALTER FUNCTION "public"."upsert_work_steps"("_work_plan_id" "text", "_steps" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."address" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "street" "text" NOT NULL,
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "country" "text" NOT NULL,
    "createdDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postal_code" "text" NOT NULL,
    "geography" "extensions"."geography" NOT NULL
);

ALTER TABLE "public"."address" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."asset" (
    "id" "text" DEFAULT "public"."nanoid"(17) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "workspace_id" "text" NOT NULL,
    "location_id" "text"
);

ALTER TABLE "public"."asset" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."assigned_resource" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "service_resource_id" "text" NOT NULL,
    "service_appointment_id" "text" NOT NULL
);

ALTER TABLE "public"."assigned_resource" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."company" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "workspace_id" "text" NOT NULL
);

ALTER TABLE "public"."company" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."company_user" (
    "company_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."company_user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."location" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "location_type" "public"."LocationType" DEFAULT 'BUILDING'::"public"."LocationType" NOT NULL,
    "location_level" integer DEFAULT 1 NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "parent_location_id" "text",
    "workspace_id" "text" NOT NULL,
    "address_id" "text" NOT NULL,
    "company_id" "text"
);

ALTER TABLE "public"."location" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."note" (
    "content" "text" NOT NULL,
    "type" "public"."NoteType" NOT NULL,
    "metadata" "jsonb",
    "id" "text" DEFAULT "public"."nanoid"(17) NOT NULL,
    "work_order_id" "text" NOT NULL,
    "created_by_id" "uuid" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."note" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."role_permission" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role" "public"."role" NOT NULL,
    "permission" "public"."Permission" NOT NULL
);

ALTER TABLE "public"."role_permission" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_appointment" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "work_order_id" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "end_date" timestamp(6) with time zone NOT NULL,
    "start_date" timestamp(6) with time zone NOT NULL,
    "work_order_item_id" "text"
);

ALTER TABLE "public"."service_appointment" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_resource" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "team_id" "text" NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "full_name" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"simple"'::"regconfig", ((COALESCE("first_name", ''::"text") || ' '::"text") || COALESCE("last_name", ''::"text")))) STORED
);

ALTER TABLE "public"."service_resource" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_resource_absence" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "service_resource_id" "text" NOT NULL,
    "start_date" timestamp(3) without time zone NOT NULL,
    "end_date" timestamp(3) without time zone NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."service_resource_absence" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_resource_skill" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "service_resource_id" "text" NOT NULL,
    "skill_id" "text" NOT NULL,
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."service_resource_skill" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."shift" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "team_id" "text" NOT NULL,
    "days" integer[],
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL
);

ALTER TABLE "public"."shift" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."skill" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."skill" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."team" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "image_uri" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "workspace_id" "text" NOT NULL,
    "identity" "text" NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."team" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."team_user" (
    "user_id" "uuid" NOT NULL,
    "team_id" "text" NOT NULL,
    "role" "public"."role" NOT NULL
);

ALTER TABLE "public"."team_user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "image_uri" "text",
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "external_id" "uuid",
    "full_name" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"simple"'::"regconfig", ((COALESCE("first_name", ''::"text") || ' '::"text") || COALESCE("last_name", ''::"text")))) STORED
);

ALTER TABLE "public"."user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_order" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "status" "public"."Status" DEFAULT 'OPEN'::"public"."Status" NOT NULL,
    "team_id" "text" NOT NULL,
    "work_plan_id" "text",
    "location_id" "text",
    "company_id" "text" NOT NULL,
    "priority" "public"."Priority" DEFAULT 'LOW'::"public"."Priority" NOT NULL,
    "sheduled_end" timestamp(6) with time zone,
    "sheduled_start" timestamp(6) with time zone,
    "type" "public"."WorkOrderType" DEFAULT 'INSPECTION'::"public"."WorkOrderType" NOT NULL,
    "source" "public"."WorkOrderSource",
    "requested_by_id" "uuid",
    "workspace_id" "text" NOT NULL,
    "ended_at" timestamp(6) with time zone,
    "started_at" timestamp(6) with time zone
);

ALTER TABLE "public"."work_order" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_order_item" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "work_order_id" "text" NOT NULL,
    "asset_id" "text",
    "location_id" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "status" "public"."Status" DEFAULT 'OPEN'::"public"."Status" NOT NULL
);

ALTER TABLE "public"."work_order_item" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_plan" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "work_plan_template_id" "text",
    "team_id" "text" NOT NULL
);

ALTER TABLE "public"."work_plan" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_plan_template" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "workspace_id" "text" NOT NULL
);

ALTER TABLE "public"."work_plan_template" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_step" (
    "id" "text" DEFAULT "public"."nanoid"(17) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "parent_step_id" "text",
    "created_by_id" "uuid",
    "step_order" integer,
    "work_plan_id" "text" NOT NULL,
    "work_step_template_id" "text",
    "work_order_id" "text",
    "asset_id" "text",
    "status" "public"."Status" DEFAULT 'OPEN'::"public"."Status" NOT NULL
);

ALTER TABLE "public"."work_step" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."work_step_template" (
    "id" "text" DEFAULT "public"."nanoid"(17) NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "parent_step_id" "text",
    "created_by_id" "uuid",
    "step_order" integer,
    "work_plan_template_id" "text" NOT NULL
);

ALTER TABLE "public"."work_step_template" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."workspace" (
    "id" "text" DEFAULT "public"."nanoid"(10) NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "url_key" "text" NOT NULL,
    "created_by" "uuid" NOT NULL,
    "image_uri" "text",
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."workspace" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."workspace_user" (
    "user_id" "uuid" NOT NULL,
    "workspace_id" "text" NOT NULL,
    "role" "public"."role" NOT NULL
);

ALTER TABLE "public"."workspace_user" OWNER TO "postgres";

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."address"
    ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."assigned_resource"
    ADD CONSTRAINT "assigned_resource_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."company"
    ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."company_user"
    ADD CONSTRAINT "company_user_pkey" PRIMARY KEY ("company_id", "user_id");

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."note"
    ADD CONSTRAINT "note_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."role_permission"
    ADD CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."service_appointment"
    ADD CONSTRAINT "service_appointment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."service_resource_absence"
    ADD CONSTRAINT "service_resource_absence_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."service_resource"
    ADD CONSTRAINT "service_resource_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."service_resource_skill"
    ADD CONSTRAINT "service_resource_skill_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."shift"
    ADD CONSTRAINT "shift_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."skill"
    ADD CONSTRAINT "skill_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team"
    ADD CONSTRAINT "team_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."team_user"
    ADD CONSTRAINT "team_user_pkey" PRIMARY KEY ("user_id", "team_id");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_order_item"
    ADD CONSTRAINT "work_order_item_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_plan"
    ADD CONSTRAINT "work_plan_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_plan_template"
    ADD CONSTRAINT "work_plan_template_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."work_step_template"
    ADD CONSTRAINT "work_step_template_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."workspace"
    ADD CONSTRAINT "workspace_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."workspace_user"
    ADD CONSTRAINT "workspace_user_pkey" PRIMARY KEY ("user_id", "workspace_id");

CREATE UNIQUE INDEX "address_public_id_key" ON "public"."address" USING "btree" ("public_id");

CREATE INDEX "asset_location_id_idx" ON "public"."asset" USING "btree" ("location_id");

CREATE UNIQUE INDEX "asset_public_id_key" ON "public"."asset" USING "btree" ("public_id");

CREATE INDEX "asset_workspace_id_idx" ON "public"."asset" USING "btree" ("workspace_id");

CREATE INDEX "assigned_resource_service_appointment_id_idx" ON "public"."assigned_resource" USING "btree" ("service_appointment_id");

CREATE UNIQUE INDEX "assigned_resource_service_appointment_id_service_resource_i_key" ON "public"."assigned_resource" USING "btree" ("service_appointment_id", "service_resource_id");

CREATE INDEX "assigned_resource_service_resource_id_idx" ON "public"."assigned_resource" USING "btree" ("service_resource_id");

CREATE UNIQUE INDEX "company_public_id_key" ON "public"."company" USING "btree" ("public_id");

CREATE INDEX "company_user_company_id_idx" ON "public"."company_user" USING "btree" ("company_id");

CREATE INDEX "company_user_user_id_idx" ON "public"."company_user" USING "btree" ("user_id");

CREATE INDEX "company_workspace_id_idx" ON "public"."company" USING "btree" ("workspace_id");

CREATE INDEX "location_address_id_idx" ON "public"."location" USING "btree" ("address_id");

CREATE INDEX "location_company_id_idx" ON "public"."location" USING "btree" ("company_id");

CREATE INDEX "location_parent_location_id_idx" ON "public"."location" USING "btree" ("parent_location_id");

CREATE UNIQUE INDEX "location_public_id_key" ON "public"."location" USING "btree" ("public_id");

CREATE INDEX "location_workspace_id_idx" ON "public"."location" USING "btree" ("workspace_id");

CREATE INDEX "note_created_by_id_idx" ON "public"."note" USING "btree" ("created_by_id");

CREATE INDEX "note_work_order_id_idx" ON "public"."note" USING "btree" ("work_order_id");

CREATE UNIQUE INDEX "role_permission_role_permission_key" ON "public"."role_permission" USING "btree" ("role", "permission");

CREATE INDEX "service_appointment_end_date_idx" ON "public"."service_appointment" USING "btree" ("end_date");

CREATE INDEX "service_appointment_start_date_idx" ON "public"."service_appointment" USING "btree" ("start_date");

CREATE INDEX "service_appointment_work_order_id_idx" ON "public"."service_appointment" USING "btree" ("work_order_id");

CREATE INDEX "service_appointment_work_order_item_id_idx" ON "public"."service_appointment" USING "btree" ("work_order_item_id");

CREATE INDEX "service_resource_absence_end_date_idx" ON "public"."service_resource_absence" USING "btree" ("end_date");

CREATE INDEX "service_resource_absence_service_resource_id_idx" ON "public"."service_resource_absence" USING "btree" ("service_resource_id");

CREATE INDEX "service_resource_absence_start_date_idx" ON "public"."service_resource_absence" USING "btree" ("start_date");

CREATE INDEX "service_resource_skill_service_resource_id_idx" ON "public"."service_resource_skill" USING "btree" ("service_resource_id");

CREATE INDEX "service_resource_skill_skill_id_idx" ON "public"."service_resource_skill" USING "btree" ("skill_id");

CREATE INDEX "service_resource_team_id_idx" ON "public"."service_resource" USING "btree" ("team_id");

CREATE INDEX "service_resource_user_id_idx" ON "public"."service_resource" USING "btree" ("user_id");

CREATE INDEX "skill_name_idx" ON "public"."skill" USING "btree" ("name");

CREATE UNIQUE INDEX "team_identity_workspace_id_key" ON "public"."team" USING "btree" ("identity", "workspace_id");

CREATE UNIQUE INDEX "team_name_workspace_id_key" ON "public"."team" USING "btree" ("name", "workspace_id");

CREATE UNIQUE INDEX "team_public_id_key" ON "public"."team" USING "btree" ("public_id");

CREATE INDEX "team_user_team_id_idx" ON "public"."team_user" USING "btree" ("team_id");

CREATE INDEX "team_user_user_id_idx" ON "public"."team_user" USING "btree" ("user_id");

CREATE INDEX "team_workspace_id_idx" ON "public"."team" USING "btree" ("workspace_id");

CREATE UNIQUE INDEX "user_email_key" ON "public"."user" USING "btree" ("email");

CREATE UNIQUE INDEX "user_external_id_key" ON "public"."user" USING "btree" ("external_id");

CREATE INDEX "user_full_name_idx" ON "public"."user" USING "gin" ("full_name");

CREATE INDEX "work_order_company_id_idx" ON "public"."work_order" USING "btree" ("company_id");

CREATE INDEX "work_order_item_asset_id_idx" ON "public"."work_order_item" USING "btree" ("asset_id");

CREATE INDEX "work_order_item_location_id_idx" ON "public"."work_order_item" USING "btree" ("location_id");

CREATE INDEX "work_order_item_work_order_id_idx" ON "public"."work_order_item" USING "btree" ("work_order_id");

CREATE INDEX "work_order_location_id_idx" ON "public"."work_order" USING "btree" ("location_id");

CREATE UNIQUE INDEX "work_order_public_id_key" ON "public"."work_order" USING "btree" ("public_id");

CREATE INDEX "work_order_team_id_idx" ON "public"."work_order" USING "btree" ("team_id");

CREATE INDEX "work_order_work_plan_id_idx" ON "public"."work_order" USING "btree" ("work_plan_id");

CREATE INDEX "work_order_workspace_id_idx" ON "public"."work_order" USING "btree" ("workspace_id");

CREATE UNIQUE INDEX "work_plan_public_id_key" ON "public"."work_plan" USING "btree" ("public_id");

CREATE INDEX "work_plan_team_id_idx" ON "public"."work_plan" USING "btree" ("team_id");

CREATE UNIQUE INDEX "work_plan_template_public_id_key" ON "public"."work_plan_template" USING "btree" ("public_id");

CREATE INDEX "work_plan_template_workspace_id_idx" ON "public"."work_plan_template" USING "btree" ("workspace_id");

CREATE UNIQUE INDEX "work_plan_work_plan_template_id_created_at_key" ON "public"."work_plan" USING "btree" ("work_plan_template_id", "created_at");

CREATE INDEX "work_plan_work_plan_template_id_idx" ON "public"."work_plan" USING "btree" ("work_plan_template_id");

CREATE INDEX "work_step_asset_id_idx" ON "public"."work_step" USING "btree" ("asset_id");

CREATE INDEX "work_step_created_by_id_idx" ON "public"."work_step" USING "btree" ("created_by_id");

CREATE INDEX "work_step_parent_step_id_idx" ON "public"."work_step" USING "btree" ("parent_step_id");

CREATE UNIQUE INDEX "work_step_public_id_key" ON "public"."work_step" USING "btree" ("public_id");

CREATE INDEX "work_step_template_created_by_id_idx" ON "public"."work_step_template" USING "btree" ("created_by_id");

CREATE INDEX "work_step_template_parent_step_id_idx" ON "public"."work_step_template" USING "btree" ("parent_step_id");

CREATE UNIQUE INDEX "work_step_template_public_id_key" ON "public"."work_step_template" USING "btree" ("public_id");

CREATE INDEX "work_step_template_work_plan_template_id_idx" ON "public"."work_step_template" USING "btree" ("work_plan_template_id");

CREATE INDEX "work_step_work_order_id_idx" ON "public"."work_step" USING "btree" ("work_order_id");

CREATE INDEX "work_step_work_plan_id_idx" ON "public"."work_step" USING "btree" ("work_plan_id");

CREATE INDEX "work_step_work_step_template_id_idx" ON "public"."work_step" USING "btree" ("work_step_template_id");

CREATE UNIQUE INDEX "workspace_public_id_key" ON "public"."workspace" USING "btree" ("public_id");

CREATE INDEX "workspace_url_key_idx" ON "public"."workspace" USING "btree" ("url_key");

CREATE UNIQUE INDEX "workspace_url_key_key" ON "public"."workspace" USING "btree" ("url_key");

CREATE INDEX "workspace_user_user_id_idx" ON "public"."workspace_user" USING "btree" ("user_id");

CREATE INDEX "workspace_user_workspace_id_idx" ON "public"."workspace_user" USING "btree" ("workspace_id");

CREATE OR REPLACE TRIGGER "moddatetime_work_order" BEFORE UPDATE ON "public"."work_order" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "trg_update_work_plan_template_updated_at" AFTER INSERT OR DELETE OR UPDATE ON "public"."work_step_template" FOR EACH ROW EXECUTE FUNCTION "public"."update_work_plan_template_updated_at"();

CREATE OR REPLACE TRIGGER "user_team" AFTER INSERT ON "public"."team" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_team"();

ALTER TABLE "public"."team" DISABLE TRIGGER "user_team";

CREATE OR REPLACE TRIGGER "user_workspace" AFTER INSERT ON "public"."workspace" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_workspace"();

ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."assigned_resource"
    ADD CONSTRAINT "assigned_resource_service_appointment_id_fkey" FOREIGN KEY ("service_appointment_id") REFERENCES "public"."service_appointment"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."assigned_resource"
    ADD CONSTRAINT "assigned_resource_service_resource_id_fkey" FOREIGN KEY ("service_resource_id") REFERENCES "public"."service_resource"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."company_user"
    ADD CONSTRAINT "company_user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."company_user"
    ADD CONSTRAINT "company_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."company"
    ADD CONSTRAINT "company_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_parent_location_id_fkey" FOREIGN KEY ("parent_location_id") REFERENCES "public"."location"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."note"
    ADD CONSTRAINT "note_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."note"
    ADD CONSTRAINT "note_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "public"."work_order"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."service_appointment"
    ADD CONSTRAINT "service_appointment_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "public"."work_order"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."service_appointment"
    ADD CONSTRAINT "service_appointment_work_order_item_id_fkey" FOREIGN KEY ("work_order_item_id") REFERENCES "public"."work_order_item"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."service_resource_absence"
    ADD CONSTRAINT "service_resource_absence_service_resource_id_fkey" FOREIGN KEY ("service_resource_id") REFERENCES "public"."service_resource"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."service_resource_skill"
    ADD CONSTRAINT "service_resource_skill_service_resource_id_fkey" FOREIGN KEY ("service_resource_id") REFERENCES "public"."service_resource"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."service_resource_skill"
    ADD CONSTRAINT "service_resource_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."service_resource"
    ADD CONSTRAINT "service_resource_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."service_resource"
    ADD CONSTRAINT "service_resource_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."shift"
    ADD CONSTRAINT "shift_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."team_user"
    ADD CONSTRAINT "team_user_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."team_user"
    ADD CONSTRAINT "team_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."team"
    ADD CONSTRAINT "team_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."work_order_item"
    ADD CONSTRAINT "work_order_item_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."asset"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_order_item"
    ADD CONSTRAINT "work_order_item_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_order_item"
    ADD CONSTRAINT "work_order_item_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "public"."work_order"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_work_plan_id_fkey" FOREIGN KEY ("work_plan_id") REFERENCES "public"."work_plan"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_order"
    ADD CONSTRAINT "work_order_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."work_plan"
    ADD CONSTRAINT "work_plan_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_plan_template"
    ADD CONSTRAINT "work_plan_template_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_plan"
    ADD CONSTRAINT "work_plan_work_plan_template_id_fkey" FOREIGN KEY ("work_plan_template_id") REFERENCES "public"."work_plan_template"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."asset"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_parent_step_id_fkey" FOREIGN KEY ("parent_step_id") REFERENCES "public"."work_step"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_step_template"
    ADD CONSTRAINT "work_step_template_parent_step_id_fkey" FOREIGN KEY ("parent_step_id") REFERENCES "public"."work_step_template"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_step_template"
    ADD CONSTRAINT "work_step_template_work_plan_template_id_fkey" FOREIGN KEY ("work_plan_template_id") REFERENCES "public"."work_plan_template"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "public"."work_order"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_work_plan_id_fkey" FOREIGN KEY ("work_plan_id") REFERENCES "public"."work_plan"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."work_step"
    ADD CONSTRAINT "work_step_work_step_template_id_fkey" FOREIGN KEY ("work_step_template_id") REFERENCES "public"."work_step_template"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."workspace"
    ADD CONSTRAINT "workspace_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."workspace_user"
    ADD CONSTRAINT "workspace_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."workspace_user"
    ADD CONSTRAINT "workspace_user_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Allow auth admin to read user roles" ON "public"."workspace_user" FOR SELECT TO "supabase_auth_admin" USING (true);

ALTER TABLE "public"."team_user" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "supabase_auth_admin";

GRANT ALL ON FUNCTION "public"."get_available_time_slots"("schedule_range" "tstzrange", "unavailable_time_slots" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."get_available_time_slots"("schedule_range" "tstzrange", "unavailable_time_slots" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_available_time_slots"("schedule_range" "tstzrange", "unavailable_time_slots" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_team"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_team"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_team"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_workspace"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_workspace"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_workspace"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manage_work_plan"("_work_plan_template_id" "text", "_team_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."manage_work_plan"("_work_plan_template_id" "text", "_team_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."manage_work_plan"("_work_plan_template_id" "text", "_team_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."manage_work_step"("_work_plan_id" "text", "_work_plan_template_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."manage_work_step"("_work_plan_id" "text", "_work_plan_template_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."manage_work_step"("_work_plan_id" "text", "_work_plan_template_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."manage_work_step_item"("_work_plan_id" "text", "_work_order_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."manage_work_step_item"("_work_plan_id" "text", "_work_order_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."manage_work_step_item"("_work_plan_id" "text", "_work_order_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."nanoid"("size" integer, "alphabet" "text", "additionalbytesfactor" double precision) TO "anon";
GRANT ALL ON FUNCTION "public"."nanoid"("size" integer, "alphabet" "text", "additionalbytesfactor" double precision) TO "authenticated";
GRANT ALL ON FUNCTION "public"."nanoid"("size" integer, "alphabet" "text", "additionalbytesfactor" double precision) TO "service_role";

GRANT ALL ON FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."remove_overlaps"("main_range" "tstzrange", "other_ranges" "tstzrange"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."remove_overlaps"("main_range" "tstzrange", "other_ranges" "tstzrange"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_overlaps"("main_range" "tstzrange", "other_ranges" "tstzrange"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_work_plan_template_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_work_plan_template_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_work_plan_template_updated_at"() TO "service_role";

GRANT ALL ON FUNCTION "public"."upsert_work_order_assets"("_work_order_id" "text", "_assets" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_work_order_assets"("_work_order_id" "text", "_assets" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_work_order_assets"("_work_order_id" "text", "_assets" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."upsert_work_steps"("_work_plan_id" "text", "_steps" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_work_steps"("_work_plan_id" "text", "_steps" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_work_steps"("_work_plan_id" "text", "_steps" "jsonb") TO "service_role";

GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";

GRANT ALL ON TABLE "public"."address" TO "anon";
GRANT ALL ON TABLE "public"."address" TO "authenticated";
GRANT ALL ON TABLE "public"."address" TO "service_role";

GRANT ALL ON TABLE "public"."asset" TO "anon";
GRANT ALL ON TABLE "public"."asset" TO "authenticated";
GRANT ALL ON TABLE "public"."asset" TO "service_role";

GRANT ALL ON TABLE "public"."assigned_resource" TO "anon";
GRANT ALL ON TABLE "public"."assigned_resource" TO "authenticated";
GRANT ALL ON TABLE "public"."assigned_resource" TO "service_role";

GRANT ALL ON TABLE "public"."company" TO "anon";
GRANT ALL ON TABLE "public"."company" TO "authenticated";
GRANT ALL ON TABLE "public"."company" TO "service_role";

GRANT ALL ON TABLE "public"."company_user" TO "anon";
GRANT ALL ON TABLE "public"."company_user" TO "authenticated";
GRANT ALL ON TABLE "public"."company_user" TO "service_role";

GRANT ALL ON TABLE "public"."location" TO "anon";
GRANT ALL ON TABLE "public"."location" TO "authenticated";
GRANT ALL ON TABLE "public"."location" TO "service_role";

GRANT ALL ON TABLE "public"."note" TO "anon";
GRANT ALL ON TABLE "public"."note" TO "authenticated";
GRANT ALL ON TABLE "public"."note" TO "service_role";

GRANT ALL ON TABLE "public"."role_permission" TO "anon";
GRANT ALL ON TABLE "public"."role_permission" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permission" TO "service_role";

GRANT ALL ON TABLE "public"."service_appointment" TO "anon";
GRANT ALL ON TABLE "public"."service_appointment" TO "authenticated";
GRANT ALL ON TABLE "public"."service_appointment" TO "service_role";

GRANT ALL ON TABLE "public"."service_resource" TO "anon";
GRANT ALL ON TABLE "public"."service_resource" TO "authenticated";
GRANT ALL ON TABLE "public"."service_resource" TO "service_role";

GRANT ALL ON TABLE "public"."service_resource_absence" TO "anon";
GRANT ALL ON TABLE "public"."service_resource_absence" TO "authenticated";
GRANT ALL ON TABLE "public"."service_resource_absence" TO "service_role";

GRANT ALL ON TABLE "public"."service_resource_skill" TO "anon";
GRANT ALL ON TABLE "public"."service_resource_skill" TO "authenticated";
GRANT ALL ON TABLE "public"."service_resource_skill" TO "service_role";

GRANT ALL ON TABLE "public"."shift" TO "anon";
GRANT ALL ON TABLE "public"."shift" TO "authenticated";
GRANT ALL ON TABLE "public"."shift" TO "service_role";

GRANT ALL ON TABLE "public"."skill" TO "anon";
GRANT ALL ON TABLE "public"."skill" TO "authenticated";
GRANT ALL ON TABLE "public"."skill" TO "service_role";

GRANT ALL ON TABLE "public"."team" TO "anon";
GRANT ALL ON TABLE "public"."team" TO "authenticated";
GRANT ALL ON TABLE "public"."team" TO "service_role";

GRANT ALL ON TABLE "public"."team_user" TO "anon";
GRANT ALL ON TABLE "public"."team_user" TO "authenticated";
GRANT ALL ON TABLE "public"."team_user" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

GRANT ALL ON TABLE "public"."work_order" TO "anon";
GRANT ALL ON TABLE "public"."work_order" TO "authenticated";
GRANT ALL ON TABLE "public"."work_order" TO "service_role";

GRANT ALL ON TABLE "public"."work_order_item" TO "anon";
GRANT ALL ON TABLE "public"."work_order_item" TO "authenticated";
GRANT ALL ON TABLE "public"."work_order_item" TO "service_role";

GRANT ALL ON TABLE "public"."work_plan" TO "anon";
GRANT ALL ON TABLE "public"."work_plan" TO "authenticated";
GRANT ALL ON TABLE "public"."work_plan" TO "service_role";

GRANT ALL ON TABLE "public"."work_plan_template" TO "anon";
GRANT ALL ON TABLE "public"."work_plan_template" TO "authenticated";
GRANT ALL ON TABLE "public"."work_plan_template" TO "service_role";

GRANT ALL ON TABLE "public"."work_step" TO "anon";
GRANT ALL ON TABLE "public"."work_step" TO "authenticated";
GRANT ALL ON TABLE "public"."work_step" TO "service_role";

GRANT ALL ON TABLE "public"."work_step_template" TO "anon";
GRANT ALL ON TABLE "public"."work_step_template" TO "authenticated";
GRANT ALL ON TABLE "public"."work_step_template" TO "service_role";

GRANT ALL ON TABLE "public"."workspace" TO "anon";
GRANT ALL ON TABLE "public"."workspace" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace" TO "service_role";

GRANT ALL ON TABLE "public"."workspace_user" TO "service_role";
GRANT ALL ON TABLE "public"."workspace_user" TO "supabase_auth_admin";
GRANT ALL ON TABLE "public"."workspace_user" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_user" TO "anon";
GRANT ALL ON TABLE "public"."workspace_user" TO PUBLIC;

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
