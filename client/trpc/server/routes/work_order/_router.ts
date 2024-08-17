import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../../trpc";
import { createWorkOrderHandler } from "./create.handler";
import {
  ZCreateWorkOrderSchema,
  ZCreateWorkOrderWithItemsSchema,
} from "./create.schema";
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
        const { data, error } = await getWorkOrderDetailHandler({
          input,
          db: ctx.db,
        });

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: error,
          });
        }
        return data;
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
    .input(ZCreateWorkOrderWithItemsSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),
});
