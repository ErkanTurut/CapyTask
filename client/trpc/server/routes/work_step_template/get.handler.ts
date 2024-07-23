import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TGetWorkStepTemplateSchema } from "./get.schema";
// import { cache } from "react";

export async function getStepsByWorkPlanTemplateHandler({
  input,
  db,
}: {
  input: {
    work_plan_template_id: TGetWorkStepTemplateSchema["work_plan_template_id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_template")
    .select("*")
    .eq("work_plan_template_id", input.work_plan_template_id)
    .order("step_order")
    .throwOnError();
}

export async function getStepsByIdentityHandler({
  input,
  db,
}: {
  input: {
    team_identity: TGetWorkStepTemplateSchema["team_identity"];
    range: TGetWorkStepTemplateSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_template")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end);
}

export async function getStepHandler({
  input,
  db,
}: {
  input: { id: TGetWorkStepTemplateSchema["id"] };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_template")
    .select("*")
    .eq("id", input.id)
    .single();
}

export async function searchStepsHandler({
  input,
  db,
}: {
  input: {
    q: TGetWorkStepTemplateSchema["q"];
    team_identity: TGetWorkStepTemplateSchema["team_identity"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_template")
    .select("*, work_plan_template(team!inner(*))")
    .eq("work_plan_template.team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    });
}
