import "server-only";
import type { Client, TablesInsert, TablesUpdate } from "../../../types";

export async function createWorkPlan({
  db,
  input,
}: {
  input: TablesInsert<"work_plan">;
  db: Client;
}) {
  const { data } = await db
    .from("work_plan")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkPlan({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_plan">;
  id: string;
}) {
  const { data } = await db
    .from("work_plan")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
