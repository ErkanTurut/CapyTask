import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkPlanTemplateSchema } from "./get.schema";
// import { cache } from "react";

export async function getWorkPlanTemplatesByWorkspaceHandler({
  db,
  input,
}: {
  input: {
    url_key: TGetWorkPlanTemplateSchema["url_key"];
    range: TGetWorkPlanTemplateSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*, workspace!inner(url_key)", { count: "estimated" })
    .eq("workspace.url_key", input.url_key)
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

// export async function searchWorkPlanTemplateHandler({
//   input,
//   db,
// }: {
//   input: {
//     q: TGetWorkPlanTemplateSchema["q"];
//     team_identity: TGetWorkPlanTemplateSchema["team_identity"];
//   };

//   db: SupabaseClient;
// }) {
//   return await db
//     .from("work_plan_template")
//     .select("*, team!inner(*)")
//     .eq("team.identity", input.team_identity)
//     .textSearch("name", input.q, {
//       type: "websearch",
//     })
//     .throwOnError();
// }
