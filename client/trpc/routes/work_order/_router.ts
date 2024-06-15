import {
  work_orderModel,
  work_plan_templateModel,
  work_stepModel,
} from "@/prisma/zod";
import { protectedProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createWorkOrderHandler } from "./create.handler";
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
import { Database } from "@/types/supabase.types";
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

  create: {
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
        const { data: work_plan, error: work_plan_error } = await ctx.db
          .rpc("manage_work_plan", {
            _team_id: input.team_id,
            _work_plan_template_id: input.work_plan_template.id,
          })
          .single();

        if (work_plan_error) {
          console.error(work_plan_error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: work_plan_error.message,
          });
        }

        const { data: work_step, error: work_step_error } = await ctx.db.rpc(
          "manage_work_step",
          {
            _work_plan_id: work_plan.work_plan_id,
            _work_plan_template_id: input.work_plan_template.id,
          },
        );

        if (work_step_error) {
          console.error(work_step_error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: work_step_error.message,
          });
        }

        const { data: work_order, error: work_order_error } =
          await createWorkOrderHandler({
            input: {
              ...input,
              work_plan_id: work_plan.work_plan_id,
            },
            db: ctx.db,
          });

        if (work_order_error) {
          console.error(work_order_error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: work_order_error.message,
          });
        }

        const { data: work_step_status, error: work_step_status_error } =
          await ctx.db.rpc("manage_work_step_status", {
            _work_order_id: work_order.id,
            _work_plan_id: work_plan.work_plan_id,
          });

        if (work_step_status_error) {
          console.error(work_step_status_error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: work_step_status_error.message,
          });
        }

        return {
          work_order,
          work_plan,
          work_step,
          work_step_status,
        };
      }),

    withSteps: protectedProcedure
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
              work_step: z.array(
                work_stepModel.pick({
                  name: true,
                  description: true,
                  parent_step_id: true,
                  step_order: true,
                }),
              ),
            }),
          ),
      )
      .mutation(async ({ ctx, input }) => {
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
              work_plan_id: work_plan.id,
              name: step.name,
              description: step.description,
              parent_step_id: step.parent_step_id,
            };
          }) as Database["public"]["Tables"]["work_step"]["Insert"][];

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

          const { data: work_order, error: work_order_error } =
            await createWorkOrderHandler({
              input: {
                ...input,
                work_plan_id: work_plan.id,
              },
              db: ctx.db,
            });

          if (work_order_error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: work_order_error.message,
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

          return {
            work_order,
            work_plan,
            work_step,
            work_step_status,
          };
        }
      }),
  },
});
