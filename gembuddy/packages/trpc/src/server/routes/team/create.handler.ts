import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TCreateTeamSchema } from "./create.schema";
// import { cache } from "react";

type opts = {
  input: TCreateTeamSchema;
  db: SupabaseClient;
};

export const createTeamHandler = async ({ input, db }: opts) => {
  return await db.from("team").insert(input);
};
