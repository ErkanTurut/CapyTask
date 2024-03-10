import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { unstable_cache as cache } from "next/cache";

export async function getSteps({
  plan_id,
  client,
}: {
  plan_id: string;
  client: SupabaseClient;
}) {
  return await client
    .from("step")
    .select("*")
    .order("order")
    .eq("plan_id", plan_id);
}

export async function getStepsByPlan({
  plan_id,
  client,
}: {
  plan_id: string;
  client: SupabaseClient;
}) {
  return await client
    .from("step")
    .select("*")
    .eq("plan_id", plan_id)
    .order("order");
}

export async function getStepsByIdentity({
  team_identity,
  db,
  range,
}: {
  team_identity: string;
  db: SupabaseClient;
  range: { start: number; end: number };
}) {
  return await db
    .from("step")
    .select("*, team!inner(*)")
    .eq("team.identity", team_identity)
    .range(range.start, range.end);
}

export async function getStep({
  id,
  client,
}: {
  id: string;
  client: SupabaseClient;
}) {
  return await cache(
    async () => {
      return await client.from("step").select("*").eq("id", id).single();
    },
    [`${id}-step`],
    {
      revalidate: 60,
      tags: [`${id}-step`],
    },
  )();
}

export async function searchSteps({
  q,
  team_identity,
  client,
}: {
  q: string;
  team_identity: string;
  client: SupabaseClient;
}) {
  return await client
    .from("step")
    .select("*, plan(team!inner(*))")
    .eq("plan.team.identity", team_identity)
    .textSearch("name", q, {
      type: "websearch",
    });
}
