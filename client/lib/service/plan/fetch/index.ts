import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";

// export const getUser = async (user_id: string) => {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   return await supabase.from("user").select("*").eq("id", user_id).single();
// };

export async function getPlans({
  team_id,
  db,
  range,
}: {
  team_id: string;
  db: SupabaseClient;
  range: { start: number; end: number };
}) {
  return await db
    .from("plan")
    .select("*", { count: "estimated" })
    .eq("team_id", team_id)
    .range(range.start, range.end);
}

export async function getPlansByIdentity({
  team_identity,
  db,
  range = { start: 0, end: 10 },
}: {
  team_identity: string;
  db: SupabaseClient;
  range?: { start: number; end: number };
}) {
  return await db
    .from("plan")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", team_identity)
    .range(range.start, range.end)
    .order("updated_at", { ascending: false });
}

export async function getPlan({
  plan_id,
  db,
}: {
  plan_id: string;
  db: SupabaseClient;
}) {
  return await db.from("plan").select("*").eq("id", plan_id).single();
}

export async function searchPlan({
  q,
  team_identity,
  client,
}: {
  q: string;
  team_identity: string;
  client: SupabaseClient;
}) {
  return await client
    .from("plan")
    .select("*, team!inner(*)")
    .eq("team.identity", team_identity)
    .textSearch("name", q, {
      type: "websearch",
    });
}
