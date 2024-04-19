import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteWorkStepTemplateSchema } from "./delete.schema";

type opts = {
  input: TDeleteWorkStepTemplateSchema;
  db: SupabaseClient;
};

export const deleteWorkStepTemplateHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_step_template")
    .delete()
    .eq("id", input.id)
    .throwOnError();
};
