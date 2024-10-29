import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createWorkOrderItem,
  getWorkOrderItemById,
  getWorkOrderItemByWorkOrder,
  searchWorkOrderItem,
  updateWorkOrderItem,
} from "@gembuddy/supabase/resources/work_order_item";
import {
  ZCreateWorkOrderItemSchema,
  ZGetWorkOrderItemByIdSchema,
  ZGetWorkOrderItemByWorkOrderSchema,
  ZSearchWorkOrderItemSchema,
  ZUpdateWorkOrderItemSchema,
  ZUpdateWorkOrderItemWithNoteSchema,
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
    withNote: protectedProcedure
      .input(ZUpdateWorkOrderItemWithNoteSchema)
      .mutation(async ({ ctx, input }) => {
        const { data } = await updateWorkOrderItem({
          db: ctx.db,
          input: ZUpdateWorkOrderItemSchema.parse(input),
          id: input.work_order_item_id,
        });

        if (input.note) {
          await ctx.db
            .from("note")
            .insert({
              content: input.note,
              type: "STATUS_CHANGE",
              created_by_id: ctx.session.user.id,
              work_order_id: input.work_order_id!,
            })
            .throwOnError();
        }
        return data;
      }),
  },
});
