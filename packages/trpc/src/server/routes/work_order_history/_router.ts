import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createWorkOrderHistory,
  getWorkOrderHistoryByWorkOrderId,
} from "@gembuddy/supabase/resources";
import {
  ZCreateOneWorkOrderHistorySchema,
  ZGetWorkOrderHistoryByWorkOrderSchema,
} from "./schema";

export const work_order_history = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetWorkOrderHistoryByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderHistoryByWorkOrderId({
          db: ctx.db,
          input,
        });
      }),
  },
  create: {
    one: protectedProcedure
      .input(ZCreateOneWorkOrderHistorySchema)
      .mutation(async ({ ctx, input }) => {
        return await createWorkOrderHistory({
          db: ctx.db,
          input,
        });
      }),
  },
});
