import "server-only";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";
import { Database } from "@/types/supabase.types";

// export const getWorkspace = cache(
//   async (url_key: string) => {
//     const supabase = await createSupabaseServerClient();
//     console.log(url_key);
//     return await supabase.from("workspace").select(`*`).eq("url_key", url_key);

//     // if (error) {
//     //   throw new Error(error.message);
//     // }
//     // if (!workspace) {
//     //   throw new Error("User not found");
//     // }
//     // return workspace;
//   },
//   ["workspace"],
//   {
//     tags: ["workspace"],
//     revalidate: 20,
//   }
// );

export const getWorkspace = async (url_key: string) => {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("workspace").select("*").eq("url_key", url_key);
};

export const getWorkspaces = async () => {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("workspace").select("*");
};

export const getUserWorkspace = async (user_id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data: workspace, error } = await supabase
    .from("user_workspace")
    .select(`workspace!inner(*)`)
    .eq("user_id", user_id);

  console.log("workspace", workspace);

  return { workspace, error };
};

// const { data: teams, error } = await supabase
// .from("user_team")
// .select(`team!inner(*)`)
// .eq("user_id", user_id);
