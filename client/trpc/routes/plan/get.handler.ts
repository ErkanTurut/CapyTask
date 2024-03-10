import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TGetPlanSchema } from "./get.schema";
// import { cache } from "react";

export async function getPlansByTeamIdHandler({
  input,
  db,
}: {
  input: {
    team_id: TGetPlanSchema["team_id"];
    range: TGetPlanSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("plan")
    .select("*", { count: "estimated" })
    .eq("team_id", input.team_id)
    .range(input.range.start, input.range.end);
}

export async function getPlansByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetPlanSchema["team_identity"];
    range: TGetPlanSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("plan")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false });
}

export async function getPlanHandler({
  input,
  db,
}: {
  input: {
    id: TGetPlanSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db.from("plan").select("*").eq("id", input.id).single();
}

export async function searchPlanHandler({
  input,
  db,
}: {
  input: {
    q: TGetPlanSchema["q"];
    team_identity: TGetPlanSchema["team_identity"];
  };

  db: SupabaseClient;
}) {
  return await db
    .from("plan")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    });
}
