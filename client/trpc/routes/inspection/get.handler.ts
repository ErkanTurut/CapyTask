import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetInspectionSchema } from "./get.schema";

type opts = {
  input: TGetInspectionSchema;
  db: SupabaseClient;
};

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
    .from("inspection")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false })
    .throwOnError();
}

export async function searchInspectionHandler({
  input,
  db,
}: {
  input: {
    q: TGetInspectionSchema["q"];
    team_identity: TGetInspectionSchema["team_identity"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    })
    .throwOnError();
}
