import "server-only";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

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
    .from("plan")
    .select("*, step!inner(*)")
    .eq("id", plan_id)
    .single();
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
  return await client.from("step").select("*").eq("id", id).single();
}

export async function searchSteps({
  q,
  client,
}: {
  q: string;
  client: SupabaseClient;
}) {
  return await client.from("step").select().textSearch("name", q, {
    type: "websearch",
  });
}
