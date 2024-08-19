import "server-only";

import { protectedProcedure, router } from "@/trpc/server/trpc";
import { getWorkOrderItemByWorkOrderHandler } from "./get.handler";
import { ZGetWorkOrderItemByWorkOrderSchema } from "./get.schema";
export const work_order_item = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetWorkOrderItemByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderItemByWorkOrderHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
