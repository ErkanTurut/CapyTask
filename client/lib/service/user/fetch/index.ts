import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";

// export const getUser = async (user_id: string) => {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   return await supabase.from("user").select("*").eq("id", user_id).single();
// };

export async function getUser(user_id: string, supabase: SupabaseClient) {
  return await cache(
    async () => {
      return await supabase.from("user").select("*").eq("id", user_id).single();
    },
    [`${user_id}-user`],
    {
      revalidate: 60,
      tags: [`${user_id}-user`],
    },
  )();
}
