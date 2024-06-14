import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { work_orderModel } from "@/prisma/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
});

export async function createWorkOrderHandler({
  input,
  db,
}: {
  input: z.infer<typeof inputZod>;
  db: SupabaseClient;
}) {
  const { data: work_order, error } = await db
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

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  return work_order;
}
