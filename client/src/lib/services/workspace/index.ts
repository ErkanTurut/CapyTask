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
//     const { data: workspace, error } = await supabase
//       .from("workspace")
//       .select(`user_workspace!inner(*)`)
//       .eq("url_key", url_key)
//       .single();

//     if (error) {
//       throw new Error(error.message);
//     }
//     if (!workspace) {
//       throw new Error("User not found");
//     }
//     return workspace;
//   },
//   ["workspace"],
//   {
//     tags: ["workspace"],
//     revalidate: 1,
//   }
// );

export const getWorkspace = async (url_key: string) => {
  const supabase = await createSupabaseServerClient();
  const { data: workspace, error } = await supabase
    .from("workspace")
    .select("*, user(*)")
    .eq("url_key", url_key)
    .single();

  return { workspace, error };
};

// const { data: teams, error } = await supabase
// .from("user_team")
// .select(`team!inner(*)`)
// .eq("user_id", user_id);
