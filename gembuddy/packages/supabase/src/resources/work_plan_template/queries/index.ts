import "server-only";
import type { Client } from "../../../types";

export async function getWorkPlanTemplateById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("work_plan_template")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getWorkPlanTemplatesByWorkspace({
  db,
  input,
}: {
  db: Client;
  input: {
    workspace_id: string;
    range: {
      from: number;
      to: number;
    };
  };
}) {
  const { data } = await db
    .from("work_plan_template")
    .select()
    .eq("workspace_id", input.workspace_id)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data };
}
