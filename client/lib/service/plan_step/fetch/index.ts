import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";

// export const getUser = async (user_id: string) => {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   return await supabase.from("user").select("*").eq("id", user_id).single();
// };

export async function getPlanSteps({
  plan_id,
  client,
}: {
  plan_id: string;
  client: SupabaseClient;
}) {
  return await cache(
    async () => {
      return await client
        .from("plan_step")
        .select("*, step!inner(*), plan!inner(*)")
        .eq("plan_id", plan_id)
        .order("order");
    },
    [`${plan_id}-steps`],
    {
      revalidate: 60,
      tags: [`${plan_id}-steps`],
    },
  )();
}
