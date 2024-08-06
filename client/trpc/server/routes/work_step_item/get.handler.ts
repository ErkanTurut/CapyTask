import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkStepStatusSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

export async function getStepWithWorkOrderHandler({
  input,
  db,
}: {
  input: {
    work_order_id: TGetWorkStepStatusSchema["work_order_id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_item")
    .select("*, work_order!inner(*), work_step!inner(*)")
    .eq("work_order.id", input.work_order_id)
    .order("step_order")
    .throwOnError();
}

export async function getStepsStatusWithId({
  input,
  db,
}: {
  input: {
    work_order_id: TGetWorkStepStatusSchema["work_order_id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_step_item")
    .select("*, work_order!inner(*), work_step!inner(*)")
    .eq("work_order.id", input.work_order_id)
    .order("step_order")
    .throwOnError();
}
