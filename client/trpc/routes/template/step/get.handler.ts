import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TGetStepSchema } from "./get.schema";
// import { cache } from "react";

export async function getStepsByInspectionHandler({
  input,
  db,
}: {
  input: { inspection_template_id: TGetStepSchema["inspection_template_id"] };
  db: SupabaseClient;
}) {
  return await db
    .from("step_template")
    .select("*")
    .eq("inspection_template_id", input.inspection_template_id)
    .order("order")
    .throwOnError();
}

export async function getStepsByIdentityHandler({
  input,
  db,
}: {
  input: {
    team_identity: TGetStepSchema["team_identity"];
    range: TGetStepSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("step_template")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end);
}

export async function getStepHandler({
  input,
  db,
}: {
  input: { id: TGetStepSchema["id"] };
  db: SupabaseClient;
}) {
  return await db.from("step_template").select("*").eq("id", input.id).single();
}

export async function searchStepsHandler({
  input,
  db,
}: {
  input: {
    q: TGetStepSchema["q"];
    team_identity: TGetStepSchema["team_identity"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("step_template")
    .select("*, inspection_template(team!inner(*))")
    .eq("inspection_template.team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    });
}
