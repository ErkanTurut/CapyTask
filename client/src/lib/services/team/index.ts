import type { team } from "@prisma/client";

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";

export const getTeam = async (user_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/team`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }
    return (await res.json()) as team[];
  } catch (err) {
    throw err;
  }
};

export const getTeamById = async (team_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/team/${team_id}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(await res.json());
    }
    return (await res.json()) as team[];
  } catch (err) {
    throw err;
  }
};
