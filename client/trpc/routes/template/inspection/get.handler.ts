import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetInspectionSchema } from "./get.schema";
// import { cache } from "react";

export async function getInspectionsByTeamIdHandler({
  input,
  db,
}: {
  input: {
    team_id: TGetInspectionSchema["team_id"];
    range: TGetInspectionSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*", { count: "estimated" })
    .eq("team_id", input.team_id)
    .range(input.range.start, input.range.end);
}

export async function getInspectionsByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetInspectionSchema["team_identity"];
    range: TGetInspectionSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false })
    .throwOnError();
}

export async function getInspectionHandler({
  input,
  db,
}: {
  input: {
    id: TGetInspectionSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*")
    .eq("id", input.id)
    .single();
}

export async function getInspectionStepsHandler({
  input,
  db,
}: {
  input: {
    id: TGetInspectionSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*, step_template!inner(*) ")
    .eq("id", input.id)
    .single()
    .throwOnError();
}

export async function searchInspectionHandler({
  input,
  db,
}: {
  input: {
    q: TGetInspectionSchema["q"];
    team_id: TGetInspectionSchema["team_id"];
  };

  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*")
    .eq("team_id", input.team_id)
    .textSearch("name", input.q, {
      type: "websearch",
    })
    .throwOnError();
}
