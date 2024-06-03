import "server-only";

import { Database, SupabaseClient } from "@/lib/supabase/server";
import { TCreateWorkOrderSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";
import { upsertWorkStepStatusHandler } from "../work_step_status/upsert.handler";
import { upsertWorkStepsHandler } from "../work_step/upsert.handler";

type opts = {
  input: TCreateWorkOrderSchema;
  db: SupabaseClient;
};

// export const createWorkOrderHandler = async ({ input, db }: opts) => {
//   const { data: work_plan_id, error } = await db.rpc("create_work_plan", {
//     work_plan_template_id_param: input.work_plan_template_id,
//   });
//   console.log(error);

//   if (error || !work_plan_id) {
//     throw new TRPCError({
//       message: "Failed to create work plan",
//       code: "INTERNAL_SERVER_ERROR",
//     });
//   }

//   const { data: work_order } = await db
//     .from("work_order")
//     .insert({
//       name: input.name,
//       team_id: input.team_id,
//       description: input.description,
//       work_plan_id,
//     })
//     .select("*")
//     .single()
//     .throwOnError();

//   if (!work_order) {
//     throw new TRPCError({
//       message: "Failed to create work order",
//       code: "INTERNAL_SERVER_ERROR",
//     });
//   }

//   const { data: work_step } = await db
//     .from("work_step")
//     .select("*")
//     .eq("work_plan_id", work_plan_id);

//   if (!work_step) {
//     throw new TRPCError({
//       message: "Failed to create work plan snapshot",
//       code: "INTERNAL_SERVER_ERROR",
//     });
//   }

//   await upsertWorkStepStatusHandler({
//     db,
//     input: work_step.map((step) => ({
//       work_order_id: work_order.id,
//       work_step_id: step.id,
//       step_order: step.step_order,
//     })),
//   });

//   return work_order;
// };

interface Input {
  name: string;
  team_id: string;
  description: string;
  company_id: string;
  location_id: string;
  work_plan_template_id: string;
  work_step: Database["public"]["Tables"]["work_step"]["Row"][] | null;
}

async function createWorkOrder(ctx: any, input: Input) {
  let workPlan: Database["public"]["Tables"]["work_plan"]["Row"] | null = null;

  try {
    const { data: workOrder, error: workOrderError } = await ctx.db
      .from("work_order")
      .insert({
        name: input.name,
        team_id: input.team_id,
        description: input.description,
        company_id: input.company_id,
        location_id: input.location_id,
      })
      .select("*")
      .single();

    if (workOrderError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: workOrderError.message,
      });
    }

    if (input.work_plan_template_id) {
      workPlan = await handleWorkPlanTemplate(ctx, input, workOrder.id);
    } else {
      workPlan = await createDefaultWorkPlanHandler(ctx, input, workOrder.id);
    }

    return { work_order: workOrder, work_plan: workPlan };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
}

export async function createDefaultWorkPlanHandler(
  db: SupabaseClient,
  input: Input,
  workOrderId: string,
) {
  const { data: workPlan, error } = await db
    .from("work_plan")
    .insert({
      name: input.name,
      description: input.description,
      team_id: input.team_id,
    })
    .select("*")
    .single();

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  if (input.work_step) {
    await upsertWorkStepsHandler({
      db,
      steps: input.work_step,
      workPlanId: workPlan.id,
      workOrderId,
    });
  }

  return workPlan;
}

async function handleWorkPlanTemplate(
  db: SupabaseClient,
  input: Input,
  workOrderId: string,
) {
  let workPlan: Database["public"]["Tables"]["work_plan"]["Row"] | null = null;

  const { data: workPlanTemplate } = await db
    .from("work_plan_template")
    .select("*")
    .eq("id", input.work_plan_template_id)
    .single();

  if (!workPlanTemplate) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Work plan template not found",
    });
  }

  const { data: existingWorkPlan } = await db
    .from("work_plan")
    .select("*")
    .eq("work_plan_template_id", input.work_plan_template_id)
    .eq("created_at", workPlanTemplate.updated_at)
    .single();

  workPlan = existingWorkPlan;

  if (!workPlan) {
    const { data, error } = await db
      .from("work_plan")
      .insert({
        name: workPlanTemplate.name,
        team_id: input.team_id,
        work_plan_template_id: workPlanTemplate.id,
        description: workPlanTemplate.description,
        created_at: workPlanTemplate.updated_at,
        updated_at: workPlanTemplate.updated_at,
      })
      .select("*")
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
    workPlan = data;
  }

  const { data: workStepTemplate } = await db
    .from("work_step_template")
    .select("*")
    .eq("work_plan_template_id", workPlanTemplate.id);

  // if (workStepTemplate) {
  //   await upsertWorkStepsHandler({
  //     db,
  //     steps: workStepTemplate,
  //     workPlanId: workPlan.id,
  //   });
  // }

  return workPlan;
}
