import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpdateStepSchema } from "./update.schema";

type opts = {
  input: TUpdateStepSchema;
  db: SupabaseClient;
};

export const updateStepHandler = async ({ input, db }: opts) => {
  return await db
    .from("step_template")
    .update(input)
    .eq("id", input.id)
    .select("*")
    .single()
    .throwOnError();
};
