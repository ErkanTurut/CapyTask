import {
  work_orderModel,
  work_plan_templateModel,
  work_stepModel,
} from "@/prisma/zod";
import { protectedProcedure, router } from "@/trpc/trpc";
import { Database } from "@/types/supabase.types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createWorkOrderHandler } from "./create.handler";
import { ZCreateWorkOrderSchema } from "./create.schema";
import { deleteWorkOrderHandler } from "./delete.handler";
import { ZDeleteWorkOrderSchema } from "./delete.schema";
import {
  getWorkOrderDetailHandler,
  getWorkOrderHandler,
  getWorkOrderStatusHandler,
  getWorkOrderStepsHandler,
  getWorkOrdersByIdentityHandler,
  searchWorkOrderHandler,
} from "./get.handler";
import { ZGetWorkOrderSchema } from "./get.schema";
import { updateWorkOrderStatusHandler } from "./update.handler";
import { ZUpdateWorkOrderSchema } from "./update.schema";
import { Database } from "@/lib/supabase/server";
export const work_order = router({
  get: {
    byId: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderHandler({
          input,
          db: ctx.db,
        });
      }),
    byTeamIdentity: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrdersByIdentityHandler({
          input,
          db: ctx.db,
        });
      }),

    withSteps: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderStepsHandler({
          input,
          db: ctx.db,
        });
      }),
    status: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        const { data } = await getWorkOrderStatusHandler({
          input,
          db: ctx.db,
        });
        return data;
      }),
    detail: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderDetailHandler({
          input,
          db: ctx.db,
        });
      }),
  },
  search: protectedProcedure
    .input(ZGetWorkOrderSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),
  delete: protectedProcedure
    .input(ZDeleteWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),
  update: {
    status: protectedProcedure
      .input(ZUpdateWorkOrderSchema.pick({ id: true, status: true }))
      .mutation(async ({ ctx, input }) => {
        updateWorkOrderStatusHandler({
          input,
          db: ctx.db,
        });
      }),
  },
  // create: protectedProcedure
  //   .input(ZCreateWorkOrderSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { data: work_plan } = await ctx.db.rpc("manage_work_plan", {
  //       input_work_plan_template_id: input.work_plan_template_id,
  //       input_team_id: input.team_id,
  //     });
  //   }),
  createdd: {
    withTemplate: protectedProcedure
      .input(
        work_orderModel
          .pick({
            name: true,
            description: true,
            team_id: true,
            company_id: true,
            location_id: true,
          })
          .merge(
            z.object({
              work_plan_template: work_plan_templateModel.pick({
                id: true,
              }),
            }),
          ),
      )
      .mutation(async ({ ctx, input }) => {
        let work_plan = null as
          | Database["public"]["Tables"]["work_plan"]["Row"]
          | null;

        const work_order = await createWorkOrderHandler({
          input,
          db: ctx.db,
        });

        const { data: work_plan_template } = await ctx.db
          .from("work_plan_template")
          .select("*")
          .eq("id", input.work_plan_template.id)
          .single();

        if (!work_plan_template) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Work plan template not found",
          });
        }

        const { data } = await ctx.db
          .from("work_plan")
          .select("*")
          .eq("work_plan_template_id", input.work_plan_template.id)
          .eq("created_at", work_plan_template.updated_at)
          .single();

        work_plan = data;

        if (!work_plan) {
          const { data, error } = await ctx.db
            .from("work_plan")
            .insert({
              name: work_plan_template.name,
              team_id: input.team_id,
              work_plan_template_id: work_plan_template.id,
              description: work_plan_template.description,
              created_at: work_plan_template.updated_at,
              updated_at: work_plan_template.updated_at,
            })
            .select("*")
            .single();
          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }
          work_plan = data;
        }

        // handle work steps
        const { data: work_step } = await ctx.db
          .from("work_step")
          .select("*")
          .eq("work_plan_id", work_plan.id);

        // if there are already work steps related to the work plan, then we will use them
        if (work_step) {
          // create work step status that will be used to track the progress of the work order
          const steps = work_step.map((step) => {
            return {
              work_step_id: step.id,
              work_order_id: work_order.id,
              step_order: step.step_order,
            };
          }) as Database["public"]["Tables"]["work_step_status"]["Insert"][];

          const { data: work_step_status, error } = await ctx.db
            .from("work_step_status")
            .upsert(steps)
            .select("*");

          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }
        } else {
          // if there are no work steps related to the work plan, then we will create them
          const { data: work_step_template, error } = await ctx.db
            .from("work_step_template")
            .select("*")
            .eq("work_plan_template_id", work_plan_template.id);

          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }

          const steps = work_step_template.map((step) => {
            return {
              name: step.name,
              description: step.description,
              step_order: step.step_order,
              work_step_template_id: step.id,
              parent_step_id: step.parent_step_id,
              work_plan_id: work_plan.id,
            };
          }) as Database["public"]["Tables"]["work_step"]["Insert"][];
          const { data: work_step, error: work_step_error } = await ctx.db
            .from("work_step")
            .upsert(steps)
            .select("*");

          if (work_step_error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: work_step_error.message,
            });
          }

          const stepStatus = work_step.map((step) => {
            return {
              work_step_id: step.id,
              work_order_id: work_order.id,
            };
          });
          const { data: work_step_status } = await ctx.db
            .from("work_step_status")
            .upsert(stepStatus)
            .select("*");
        }

        // const { data: work_step_template } = await ctx.db
        //   .from("work_step_template")
        //   .select("*")
        //   .eq("work_plan_template_id", work_plan_template.id);

        // if (work_step_template) {
        //   const steps = work_step_template.map((step) => {
        //     return {
        //       ...step,
        //       work_plan_id: work_plan.id,
        //     };
        //   });
        //   const { data: work_step, error } = await ctx.db
        //     .from("work_step")
        //     .upsert(steps)
        //     .select("*");

        //   if (error) {
        //     throw new TRPCError({
        //       code: "INTERNAL_SERVER_ERROR",
        //       message: error.message,
        //     });
        //   }

        //   const stepStatus = work_step.map((step) => {
        //     return {
        //       work_step_id: step.id,
        //       work_order_id: work_order.id,
        //     };
        //   });
        //   const { data: work_step_status } = await ctx.db
        //     .from("work_step_status")
        //     .upsert(stepStatus)
        //     .select("*");
        // }
      }),
    withSteps: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string(),
          work_step: z.array(work_stepModel),
          team_id: z.string(),
          company_id: z.string(),
          location_id: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { data: work_order, error } = await ctx.db
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

        const { data: work_plan, error: work_plan_error } = await ctx.db
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
              ...step,
              work_plan_id: work_plan.id,
            };
          });
          const { data: work_step, error } = await ctx.db
            .from("work_step")
            .upsert(steps)
            .select("*");

          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }

          // upsert work step status for each work step
          const stepStatus = work_step.map((step) => {
            return {
              work_step_id: step.id,
              work_order_id: work_order.id,
            };
          });
          const { data: work_step_status } = await ctx.db
            .from("work_step_status")
            .upsert(stepStatus)
            .select("*");
        }
      }),
  },
});
