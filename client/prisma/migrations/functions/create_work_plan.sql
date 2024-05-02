CREATE OR REPLACE FUNCTION create_work_plan(
    work_plan_template_id_param TEXT
)
RETURNS TEXT
AS $$
DECLARE
    work_plan_id TEXT;
    work_plan_created_at TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Fetch creation timestamp from the work plan template
    SELECT updated_at INTO work_plan_created_at
    FROM work_plan_template
    WHERE id = work_plan_template_id_param;

    -- Check if a snapshot already exists for the given work plan template
    SELECT id INTO work_plan_id
    FROM work_plan
    WHERE work_plan.work_plan_template_id = work_plan_template_id_param
    AND work_plan.created_at = work_plan_created_at;

    -- If snapshot doesn't exist, create a new one
    IF work_plan_id IS NULL THEN
        INSERT INTO work_plan (id, work_plan_template_id,team_id, name, description, created_at, updated_at)
        SELECT nanoid(10), work_plan_template_id_param, team_id, name, description, work_plan_created_at, work_plan_created_at
        FROM work_plan_template
        WHERE id = work_plan_template_id_param
        RETURNING id INTO work_plan_id;

        -- Call create_step_template_snapshot function
        PERFORM create_work_step(work_plan_template_id_param, work_plan_id);

    END IF;

    RETURN work_plan_id;

END;
$$ LANGUAGE plpgsql;
