import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkPlanTemplateSchema } from "./get.schema";
// import { cache } from "react";

export async function getWorkPlanTemplatesByTeamIdHandler({
  input,
  db,
}: {
  input: {
    team_id: TGetWorkPlanTemplateSchema["team_id"];
    range: TGetWorkPlanTemplateSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*", { count: "estimated" })
    .eq("team_id", input.team_id)
    .range(input.range.start, input.range.end);
}

export async function getWorkPlanTemplatesByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetWorkPlanTemplateSchema["team_identity"];
    range: TGetWorkPlanTemplateSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false })
    .throwOnError();
}

export async function getWorkPlanTemplateHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkPlanTemplateSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*")
    .eq("id", input.id)
    .single();
}

export async function getWorkPlanTemplateStepsHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkPlanTemplateSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*, work_step_template(*) ")
    .eq("id", input.id)
    .single();
}

export async function searchWorkPlanTemplateHandler({
  input,
  db,
}: {
  input: {
    q: TGetWorkPlanTemplateSchema["q"];
    team_id: TGetWorkPlanTemplateSchema["team_id"];
  };

  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*")
    .eq("team_id", input.team_id)
    .textSearch("name", input.q, {
      type: "websearch",
    })
    .throwOnError();
}
