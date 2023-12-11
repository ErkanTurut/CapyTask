import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";

export const getWorkspace = async (url_key: string) => {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("workspace").select("*").eq("url_key", url_key);
};

export const getWorkspaces = async () => {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("workspace").select("*");
};

export const getUserWorkspace = async (user_id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data: workspace, error } = await supabase
    .from("user_workspace")
    .select(`workspace!inner(*)`)
    .eq("user_id", user_id);

  return { workspace, error };
};
