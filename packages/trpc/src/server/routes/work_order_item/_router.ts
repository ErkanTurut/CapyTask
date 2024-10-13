import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createWorkOrderItem,
  getWorkOrderItemByWorkOrder,
  updateWorkOrderItem,
  getWorkOrderItemById,
  searchWorkOrderItem,
} from "@gembuddy/supabase/resources/work_order_item";
import {
  ZCreateWorkOrderItemSchema,
  ZGetWorkOrderItemByWorkOrderSchema,
  ZGetWorkOrderItemByIdSchema,
  ZSearchWorkOrderItemSchema,
  ZUpdateWorkOrderItemSchema,
} from "./schema";

export const work_order_item = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetWorkOrderItemByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderItemByWorkOrder({
          db: ctx.db,
          input,
        });
      }),
    textSearch: protectedProcedure
      .input(ZSearchWorkOrderItemSchema)
      .query(async ({ ctx: { db }, input }) => {
        return await searchWorkOrderItem({
          db,
          input,
        });
      }),
    byId: protectedProcedure
      .input(ZGetWorkOrderItemByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderItemById({
          db: ctx.db,
          input,
        });
      }),
  },
  create: protectedProcedure
    .input(ZCreateWorkOrderItemSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrderItem({
        db: ctx.db,
        input,
      });
    }),
  update: {
    byId: protectedProcedure
      .input(ZUpdateWorkOrderItemSchema)
      .mutation(async ({ ctx, input }) => {
        return await updateWorkOrderItem({
          db: ctx.db,
          input,
          id: input.work_order_item_id,
        });
      }),
  },
});
