import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";

export const getTeams = async (
  workspace_id: string,
  supabase: SupabaseClient,
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return await cache(
    async () => {
      return await supabase
        .from("team")
        .select("*")
        .eq("workspace_id", workspace_id);
    },
    [`${session?.user.id}-${workspace_id}-teams`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${workspace_id}-teams`],
    },
  )();
};

export const getTeamsByUrlKey = async (
  url_key: string,
  supabase: SupabaseClient,
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return await cache(
    async () => {
      return await supabase
        .from("workspace")
        .select("team(*)")
        .eq("url_key", url_key)
        .single();
    },
    [`${session?.user.id}-${url_key}-teams`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${url_key}-teams`],
    },
  )();
};
