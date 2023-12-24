import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";
import { getSession } from "@/lib/services/auth";

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await getSession();
  if (!data.session) {
    return { data: null, error };
  }
  return await supabase
    .from("user")
    .select("*")
    .eq("id", data.session.user.id)
    .single();
};
