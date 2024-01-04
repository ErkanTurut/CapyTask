import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getUser = async (user_id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase.from("user").select("*").eq("id", user_id).single();
};
