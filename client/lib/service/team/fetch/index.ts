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

export const getTeamsByUrlKey = async (url_key: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
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
