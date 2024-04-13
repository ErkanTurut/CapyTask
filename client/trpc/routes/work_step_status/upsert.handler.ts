import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpsertWorkStepStatusSchema } from "./upsert.schema";

type opts = {
  input: TUpsertWorkStepStatusSchema;
  db: SupabaseClient;
};

export const upsertWorkStepStatusHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_step_status")
    .upsert(input)
    .select()
    .throwOnError();
};
