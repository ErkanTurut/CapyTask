import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateWorkOrderSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";
import { upsertWorkStepStatusHandler } from "../work_step_status/upsert.handler";

type opts = {
  input: TCreateWorkOrderSchema;
  db: SupabaseClient;
};

export const createWorkOrderHandler = async ({ input, db }: opts) => {
  const { data: work_plan_id, error } = await db.rpc("create_work_plan", {
    work_plan_template_id: input.work_plan_template_id,
  });

  if (error || !work_plan_id) {
    throw new TRPCError({
      message: "Failed to create work plan",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  const { data: work_order } = await db
    .from("work_order")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      work_plan_id,
    })
    .select("*")
    .single()
    .throwOnError();

  if (!work_order) {
    throw new TRPCError({
      message: "Failed to create work order",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  const { data: work_step } = await db
    .from("work_step")
    .select("*")
    .eq("work_plan_id", work_plan_id);

  if (!work_step) {
    throw new TRPCError({
      message: "Failed to create work plan snapshot",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  await upsertWorkStepStatusHandler({
    db,
    input: work_step.map((step) => ({
      work_order_id: work_order.id,
      work_step_id: step.id,
    })),
  });

  return work_order;
};
