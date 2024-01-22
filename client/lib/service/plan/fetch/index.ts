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
  supabase,
  range,
}: {
  team_id: string;
  supabase: SupabaseClient;
  range: { start: number; end: number };
}) {
  return await supabase
    .from("plan")
    .select("*", { count: "estimated" })
    .eq("team_id", team_id)
    .range(range.start, range.end);
}
