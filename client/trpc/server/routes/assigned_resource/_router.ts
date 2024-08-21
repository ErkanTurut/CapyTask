import { protectedProcedure, router } from "../../trpc";
import { getAssignedResourceByWorkOrder } from "./get.handler";
import { ZGetAssignedResourceByWorkOrderSchema } from "./get.schema";

export const assigned_resource = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetAssignedResourceByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getAssignedResourceByWorkOrder({
          input,
          db: ctx.db,
        });
      }),
  },
});
