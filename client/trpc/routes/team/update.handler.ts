import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpdateTeamSchema } from "./update.schema";

type opts = {
  input: TUpdateTeamSchema;
  db: SupabaseClient;
};

export const updateTeamHandler = async ({ input, db }: opts) => {
  return await db
    .from("team")
    .update(input)
    .eq("id", input.id)
    .select("*")
    .single();
};
