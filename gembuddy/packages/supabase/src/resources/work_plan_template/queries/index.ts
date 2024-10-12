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
  const { data, count } = await db
    .from("work_plan_template")
    .select("*", { count: "estimated" })
    .eq("workspace_id", input.workspace_id)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}

export async function getWorkPlanTemplatesByUrlKey({
  db,
  input,
}: {
  db: Client;
  input: {
    url_key: string;
    range: {
      from: number;
      to: number;
    };
  };
}) {
  const { data, count } = await db
    .from("work_plan_template")
    .select("*, workspace(url_key)", { count: "estimated" })
    .eq("workspace.url_key", input.url_key)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}
