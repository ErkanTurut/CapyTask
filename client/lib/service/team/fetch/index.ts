import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getTeams = async (workspace_id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("team")
    .select("*")
    .eq("workspace_id", workspace_id);
};

export const getTeamsByUrlKey = async (url_key: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase
    .from("workspace")
    .select("team(*)")
    .eq("url_key", url_key)
    .single();
};
