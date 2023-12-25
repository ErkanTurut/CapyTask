import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";
import { getSession } from "@/lib/services/auth";

export const getUser = async (user_id: string) => {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user").select("*").eq("id", user_id).single();
};
