import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getWorkspace = async (url_key: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("workspace")
    .select("*")
    .eq("url_key", url_key)
    .single();
};

// export const getWorkspaces = async () => {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   return await supabase.from("workspace").select("*");
// };

export const getWorkspaces = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
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

export const getUserWorkspace = async (user_id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: workspace, error } = await supabase
    .from("user_workspace")
    .select(`workspace!inner(*)`)
    .eq("user_id", user_id);

  return { workspace, error };
};
