import "server-only";

import { Database } from "@/types/supabase.types";
import type { team } from "@prisma/client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from "next/cache";
import { cookies } from "next/headers";

// export const getTeam = async (user_id: string) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/team`, {
//       method: "GET",
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(await res.json());
//     }
//     return (await res.json()) as team[];
//   } catch (err) {
//     throw err;
//   }
// };

// export const getTeamById = async (team_id: string) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/team/${team_id}`, {
//       method: "GET",
//     });
//     if (!res.ok) {
//       throw new Error(await res.json());
//     }
//     return (await res.json()) as team[];
//   } catch (err) {
//     throw err;
//   }
// };

const supabase = createServerComponentClient<Database>({ cookies });

export const getTeams = cache(
  async (user_id: string) => {
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
  ["user"],
  {
    tags: ["user"],
    revalidate: 1,
  }
);
