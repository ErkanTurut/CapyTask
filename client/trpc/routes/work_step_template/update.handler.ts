import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpdateWorkStepTemplateSchema } from "./update.schema";

type opts = {
  input: TUpdateWorkStepTemplateSchema;
  db: SupabaseClient;
};

export const updateWorkStepTemplateHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_step_template")
    .update(input)
    .eq("id", input.id)
    .select("*")
    .single()
    .throwOnError();
};
