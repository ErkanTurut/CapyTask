import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpsertStepSchema } from "./upsert.schema";

type opts = {
  input: TUpsertStepSchema;
  db: SupabaseClient;
};

export const upsertStepHandler = async ({ input, db }: opts) => {
  return await db.from("step").upsert(input).select();
};
