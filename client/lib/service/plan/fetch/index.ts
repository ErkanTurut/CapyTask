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
  client,
  range,
}: {
  team_id: string;
  client: SupabaseClient;
  range: { start: number; end: number };
}) {
  return await client
    .from("plan")
    .select("*", { count: "estimated" })
    .eq("team_id", team_id)
    .range(range.start, range.end);
}

export async function getPlan({
  plan_id,
  client,
}: {
  plan_id: string;
  client: SupabaseClient;
}) {
  return await client.from("plan").select("*").eq("id", plan_id).single();
}
