import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpdateWorkPlanTemplateSchema } from "./update.schema";

export async function updateWorkPlanTemplateHandler({
  input,
  db,
}: {
  input: TUpdateWorkPlanTemplateSchema;
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .update(input)
    .eq("id", input.id)

    .throwOnError();
}
