import "server-only";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";

export async function getSteps({
  plan_id,
  client,
}: {
  plan_id: string;
  client: SupabaseClient;
}) {
  return await client.from("step").select("*").eq("plan_id", plan_id);
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
