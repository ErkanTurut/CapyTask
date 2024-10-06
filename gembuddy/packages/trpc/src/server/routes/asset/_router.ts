import { protectedProcedure, router } from "../../trpc";
import {
  getAssetByTeamHandler,
  getAssetByWorkOrderHandler,
  getAssetByWorkspaceHandler,
  searchAssetHandler,
} from "./get.handler";
import { ZGetAssetSchema, ZSearchAssetSchema } from "./get.schema";
import { createAssetHandler } from "./create.handler";
import { ZAssetCreateSchema } from "./create.schema";
import { ZAssetDeleteSchema } from "./delete.schema";
import { deleteAssetHandler } from "./delete.handler";
import { TRPCError } from "@trpc/server";

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

    textSearch: protectedProcedure
      .input(ZSearchAssetSchema)
      .query(async ({ ctx, input }) => {
        const { data, error } = await searchAssetHandler({
          input,
          db: ctx.db,
        });
        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: error,
          });
        }
        return data;
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
