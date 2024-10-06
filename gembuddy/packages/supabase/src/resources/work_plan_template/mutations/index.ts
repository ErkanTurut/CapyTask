import "server-only";
import type { Client, TablesInsert, TablesUpdate } from "../../../types";

export async function createWorkPlanTemplate({
  db,
  input,
}: {
  input: TablesInsert<"work_plan_template">;
  db: Client;
}) {
  const { data } = await db
    .from("work_plan_template")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkPlanTemplate({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_plan_template">;
  id: string;
}) {
  const { data } = await db
    .from("work_plan_template")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
