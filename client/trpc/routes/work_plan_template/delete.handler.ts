import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteWorkPlanTemplateSchema } from "./delete.schema";

export async function deleteWorkPlanTemplateHandler({
  db,
  input,
}: {
  input: TDeleteWorkPlanTemplateSchema;
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .delete()
    .eq("id", input.id)
    .throwOnError();
}
