import "server-only";

import { Database } from "@/types/supabase.types";
import type { team } from "@prisma/client";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";

import createSupabaseServerClient from "@/lib/supabase/server";

export const getTeams = cache(
  async (user_id: string) => {
    const supabase = await createSupabaseServerClient();
    const { data: teams, error } = await supabase
      .from("user_team")
      .select(`team!inner(*)`)
      .eq("user_id", user_id);

    console.log(teams);

    if (error) {
      throw new Error(error.message);
    }
    return teams;
  },
  ["teams"],
  {
    tags: ["teams"],
    revalidate: 60,
  }
);
