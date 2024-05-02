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
    .update({
      name: input.name,
      description: input.description,
    })
    .eq("id", input.id)
    .select("*")
    .single()
    .throwOnError();
};
