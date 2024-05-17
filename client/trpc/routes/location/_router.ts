import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getAssetByTeamHandler,
  getAssetByWorkOrderHandler,
} from "./get.handler";
import { ZGetAssetSchema } from "./get.schema";
import { createAssetHandler } from "./create.handler";
import { ZAssetCreateSchema } from "./create.schema";
import { ZAssetDeleteSchema } from "./delete.schema";
import { deleteAssetHandler } from "./delete.handler";

export const locations = router({
  get: {
    byTeam: protectedProcedure
      .input(ZGetAssetSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getAssetByTeamHandler({
          input,
          db: ctx.db,
        });
      }),
    byWorkOrder: protectedProcedure
      .input(ZGetAssetSchema.pick({ work_order_id: true }))
      .query(async ({ ctx, input }) => {
        return await getAssetByWorkOrderHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
