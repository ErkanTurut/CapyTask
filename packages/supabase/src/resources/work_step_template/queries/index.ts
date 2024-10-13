import "server-only";
import type { Client } from "../../../types";

export async function getWorkStepTemplateById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("work_step_template")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getWorkStepTemplatesByWorkPlanTemplate({
  db,
  input,
}: {
  db: Client;
  input: {
    work_plan_template_id: string;
  };
}) {
  const { data } = await db
    .from("work_step_template")
    .select("*")
    .eq("work_plan_template_id", input.work_plan_template_id)
    .order("step_order")
    .throwOnError();

  return { data };
}
