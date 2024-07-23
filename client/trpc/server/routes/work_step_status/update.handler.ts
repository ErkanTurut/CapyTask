import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpdateWorkStepStatusSchema } from "./update.schema";

type opts = {
  input: TUpdateWorkStepStatusSchema;
  db: SupabaseClient;
};

export const updateWorkStepStatusHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_step_status")
    .update({
      status: input.status,
    })
    .eq("id", input.id)
    .select("*")
    .single()
    .throwOnError();
};
