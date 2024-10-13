import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getWorkStepsByWorkPlan({
  db,
  input,
}: {
  db: Client;
  input: {
    work_plan_id: string;
  };
}) {
  const { data } = await db
    .from("work_step")
    .select("*")
    .eq("work_plan_id", input.work_plan_id)
    .order("step_order")
    .throwOnError();

  return { data };
}

export async function getWorkStepById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("work_step")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}
