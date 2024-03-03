import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { unstable_cache as cache } from "next/cache";

export const getWorkspace = async ({
  url_key,
  supabase,
}: {
  url_key: string;
  supabase: SupabaseClient;
}) => {
  return await supabase
    .from("workspace")
    .select("*")
    .eq("url_key", url_key)
    .single();
};

// export async function getWorkspaces({
//   team_identity,
//   client,
//   range,
// }: {
//   team_identity: string;
//   client: SupabaseClient;
//   range: { start: number; end: number };
// }) {
//   const {data: user, error} = await client.auth.getUser();
//   if (!user.user) {
//     return error;
//   }
//   return await client
//     .from("workspace")
//     .select("*, user!inner(*)")
//     .eq("user.id", user.user.id )
//     .range(range.start, range.end);
// }

export const getWorkspaces = async ({ client }: { client: SupabaseClient }) => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (!user) {
    return { data: null, error };
  }
  return await cache(
    async () => {
      return await client
        .from("workspace")
        .select("*, user_workspace!inner(*)")
        .eq("user_workspace.user_id", user.id);
    },
    [`${user.id}-workspaces`],
    {
      revalidate: 60,
      tags: [`${user.id}-workspaces`],
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
