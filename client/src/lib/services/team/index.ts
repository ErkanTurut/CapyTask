import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";

export const getTeams = async (workspace_id: string) => {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("team")
    .select("*")
    .eq("workspace_id", workspace_id);
};
