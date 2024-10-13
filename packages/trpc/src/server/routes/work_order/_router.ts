import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createWorkOrder,
  deleteWorkOrders,
  getWorkOrderById,
  getWorkOrdersByTeam,
  searchWorkOrder,
  updateWorkOrder,
} from "@gembuddy/supabase/resources/work_order";
import {
  ZCreateWorkOrderSchema,
  ZDeleteWorkOrderManySchema,
  ZGetWorkOrderByIdSchema,
  ZGetWorkOrderByTeamSchema,
  ZSearchWorkOrderSchema,
  ZUpdateWorkOrderSchema,
} from "./schema";
export const work_order = router({
  get: {
    byId: protectedProcedure
      .input(ZGetWorkOrderByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderById({
          db: ctx.db,
          input,
        });
      }),
    byTeam: protectedProcedure
      .input(ZGetWorkOrderByTeamSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrdersByTeam({
          input,
          db: ctx.db,
        });
      }),
    textSearch: protectedProcedure
      .input(ZSearchWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await searchWorkOrder({
          input,
          db: ctx.db,
        });
      }),
  },

  delete: {
    many: protectedProcedure
      .input(ZDeleteWorkOrderManySchema)
      .mutation(async ({ ctx, input }) => {
        return await deleteWorkOrders({
          input,
          db: ctx.db,
        });
      }),
  },
  update: {
    status: protectedProcedure
      .input(ZUpdateWorkOrderSchema)
      .mutation(async ({ ctx, input }) => {
        return await updateWorkOrder({
          db: ctx.db,
          input,
          id: input.work_order_id,
        });
      }),
  },

  create: protectedProcedure
    .input(ZCreateWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrder({
        db: ctx.db,
        input,
      });
    }),
});
