import "server-only";

import { Database, SupabaseClient } from "@/lib/supabase/server";
import { work_orderModel } from "@/prisma/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TCreateWorkOrderWithStepsSchema } from "./create.schema";

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

const inputZod = work_orderModel.pick({
  name: true,
  description: true,
  team_id: true,
  company_id: true,
  location_id: true,
  work_plan_id: true,
});

export async function createWorkOrderHandler({
  input,
  db,
}: {
  input: z.infer<typeof inputZod>;
  db: SupabaseClient;
}) {
  return await db
    .from("work_order")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      company_id: input.company_id,
      location_id: input.location_id,
      work_plan_id: input.work_plan_id,
    })
    .select("*")
    .single();
}

export async function createWorkOrderWithStepsHandler({
  input,
  db,
}: {
  input: TCreateWorkOrderWithStepsSchema;
  db: SupabaseClient;
}) {
  const { data: work_plan, error: work_plan_error } = await db
    .from("work_plan")
    .insert({
      name: input.name,
      description: input.description,
      team_id: input.team_id,
    })
    .select("*")
    .single();

  if (work_plan_error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: work_plan_error.message,
    });
  }

  if (input.work_step) {
    const steps = input.work_step.map((step) => {
      return {
        work_plan_id: work_plan.id,
        name: step.name,
        description: step.description,
        parent_step_id: step.parent_step_id,
      };
    }) as Database["public"]["Tables"]["work_step"]["Insert"][];

    const { data: work_step, error } = await db
      .from("work_step")
      .upsert(steps)
      .select("*");

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    const { data: work_order, error: work_order_error } =
      await createWorkOrderHandler({
        input: {
          ...input,
          work_plan_id: work_plan.id,
        },
        db: db,
      });

    if (work_order_error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: work_order_error.message,
      });
    }

    //upsert work order assets for each asset
    if (input.asset && input.asset.length > 0) {
      const assets = input.asset.map((asset) => {
        return {
          asset_id: asset.id,
          work_order_id: work_order.id,
        };
      });
      await db.from("work_order_asset").upsert(assets).select("*");
    }

    // upsert work step status for each work step
    const stepStatus = work_step.map((step) => {
      return {
        work_step_id: step.id,
        work_order_id: work_order.id,
      };
    });
    const { data: work_step_status } = await db
      .from("work_step_status")
      .upsert(stepStatus)
      .select("*");

    return {
      work_order,
      work_plan,
      work_step,
      work_step_status,
    };
  }
}
