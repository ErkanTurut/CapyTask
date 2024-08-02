import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpsertWorkStepTemplateSchema } from "./upsert.schema";

type opts = {
  input: TUpsertWorkStepTemplateSchema;
  db: SupabaseClient;
};

export const upsertWorkStepTemplateHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_step_template")
    .upsert(input.work_step_template)
    .select();
};
