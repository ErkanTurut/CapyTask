import "server-only";
import type { Client } from "../../../types";

export async function getWorkPlanById({
  db,
  input,
}: {
  db: Client;
  input: {
    work_plan_id: string;
  };
}) {
  const { data } = await db
    .from("work_plan")
    .select("*")
    .eq("id", input.work_plan_id)
    .single()
    .throwOnError();

  return { data };
}

export async function getWorkPlanByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data } = await db
    .from("work_plan")
    .select()
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data };
}
