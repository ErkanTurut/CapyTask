import { protectedProcedure, router } from "../../trpc";
import {
  getLocationByWorkOrder,
  getLocationByWorkspaceHandler,
} from "./get.handler";
import {
  ZGetLocationByWorkOrderSchema,
  ZGetLocationSchema,
} from "./get.schema";

export const location = router({
  get: {
    byWorkspace: protectedProcedure
      .input(ZGetLocationSchema.pick({ url_key: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getLocationByWorkspaceHandler({
          input,
          db: ctx.db,
        });
      }),
    byWorkOrder: protectedProcedure
      .input(ZGetLocationByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        const { data } = await getLocationByWorkOrder({
          input,
          db: ctx.db,
        });
        return data;
      }),
  },
});
