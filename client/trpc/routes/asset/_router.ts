import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getAssetByTeamHandler,
  getAssetByWorkOrderHandler,
  getAssetByWorkspaceHandler,
} from "./get.handler";
import { ZGetAssetSchema } from "./get.schema";
import { createAssetHandler } from "./create.handler";
import { ZAssetCreateSchema } from "./create.schema";
import { ZAssetDeleteSchema } from "./delete.schema";
import { deleteAssetHandler } from "./delete.handler";

export const asset = router({
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
    byWorkspace: protectedProcedure
      .input(ZGetAssetSchema.pick({ url_key: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getAssetByWorkspaceHandler({
          input,
          db: ctx.db,
        });
      }),
  },
  create: protectedProcedure
    .input(ZAssetCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createAssetHandler({
        input,
        db: ctx.db,
      });
    }),

  delete: protectedProcedure
    .input(ZAssetDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteAssetHandler({
        input,
        db: ctx.db,
      });
    }),
});
