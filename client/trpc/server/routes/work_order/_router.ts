import { protectedProcedure, router } from "../../trpc";
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

  create: protectedProcedure
    .input(ZCreateWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),

  // create: {
  //   withTemplate: protectedProcedure
  //     .input(ZCreateWorkOrderWithTemplateSchema)
  //     .mutation(async ({ ctx, input }) => {
  //       const { data: work_plan, error: work_plan_error } = await ctx.db
  //         .rpc("manage_work_plan", {
  //           _team_id: input.team_id,
  //           _work_plan_template_id: input.work_plan_template.id,
  //         })
  //         .single();

  //       if (work_plan_error) {
  //         console.error(work_plan_error);
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: work_plan_error.message,
  //         });
  //       }

  //       const { data: work_step, error: work_step_error } = await ctx.db.rpc(
  //         "manage_work_step",
  //         {
  //           _work_plan_id: work_plan.work_plan_id,
  //           _work_plan_template_id: input.work_plan_template.id,
  //         },
  //       );

  //       if (work_step_error) {
  //         console.error(work_step_error);
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: work_step_error.message,
  //         });
  //       }

  //       const { data: work_order, error: work_order_error } =
  //         await createWorkOrderHandler({
  //           input: {
  //             ...input,
  //             work_plan_id: work_plan.work_plan_id,
  //           },
  //           db: ctx.db,
  //         });

  //       if (work_order_error) {
  //         console.error(work_order_error);
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: work_order_error.message,
  //         });
  //       }

  //       const { data: work_step_item, error: work_step_item_error } =
  //         await ctx.db.rpc("manage_work_step_item", {
  //           _work_order_id: work_order.id,
  //           _work_plan_id: work_plan.work_plan_id,
  //         });

  //       if (work_step_item_error) {
  //         console.error(work_step_item_error);
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: work_step_item_error.message,
  //         });
  //       }

  //       return {
  //         work_order,
  //         work_plan,
  //         work_step,
  //         work_step_item,
  //       };
  //     }),

  //   withSteps: protectedProcedure
  //     .input(ZCreateWorkOrderWithStepsSchema)
  //     .mutation(async ({ ctx, input }) => {
  //       return await createWorkOrderWithStepsHandler({
  //         input,
  //         db: ctx.db,
  //       });
  //     }),
  // },
});
