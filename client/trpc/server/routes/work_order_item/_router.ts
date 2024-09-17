import "server-only";

import { protectedProcedure, router } from "@/trpc/server/trpc";
import { getWorkOrderItemByWorkOrderHandler } from "./get.handler";
import { ZGetWorkOrderItemByWorkOrderSchema } from "./get.schema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const work_order_item = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetWorkOrderItemByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        const { data, count, error } = await ctx.db
          .from("work_order_item")
          .select("*,asset(*),location(*)", {
            count: "exact",
          })
          .eq("work_order_id", input.work_order_id);

        if (error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to get work order items",
          });
        }
        return { data, count };
      }),
    textSearch: protectedProcedure
      .input(
        z.object({
          search: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        // transform space to %
        const search = input.search.replace(/ /g, "%");

        const { data, error } = await db
          .from("work_order_item")
          .select("*, asset(*), location(*)")
          .textSearch("name", search);

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
