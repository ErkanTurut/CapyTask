import "server-only";

import { SupabaseClient, createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { unstable_cache as cache } from "next/cache";
import { sleep } from "@/lib/utils";

export const getWorkspace = async (
  url_key: string,
  supabase: SupabaseClient,
) => {
  return await supabase
    .from("workspace")
    .select("*")
    .eq("url_key", url_key)
    .single();
};

export const getWorkspaces = async (supabase: SupabaseClient) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return await cache(
    async () => {
      return await supabase.from("workspace").select("*");
    },
    [`${session?.user.id}-workspaces`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-workspaces`],
    },
  )();
};

export const getUserWorkspace = async (
  user_id: string,
  supabase: SupabaseClient,
) => {
  const { data: workspace, error } = await supabase
    .from("user_workspace")
    .select(`workspace!inner(*)`)
    .eq("user_id", user_id);

  return { workspace, error };
};
