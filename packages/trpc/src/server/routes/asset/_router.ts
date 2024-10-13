import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createAsset,
  deleteAsset,
  getAssetByWorkspace,
  getAssetsByTeam,
  getAssetsByWorkOrder,
  searchAsset,
  updateAsset,
} from "@gembuddy/supabase/resources/asset";
import {
  ZAssetCreateSchema,
  ZAssetDeleteSchema,
  ZAssetUpdateSchema,
  ZGetAssetByTeamSchema,
  ZGetAssetByWorkOrderSchema,
  ZGetAssetByWorkspaceSchema,
  ZSearchAssetSchema,
} from "./schema";

export const asset = router({
  get: {
    byTeam: protectedProcedure
      .input(ZGetAssetByTeamSchema)
      .query(async ({ ctx, input }) => {
        return await getAssetsByTeam({
          db: ctx.db,
          input,
        });
      }),
    byWorkOrder: protectedProcedure
      .input(ZGetAssetByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getAssetsByWorkOrder({
          db: ctx.db,
          input,
        });
      }),
    byWorkspace: protectedProcedure
      .input(ZGetAssetByWorkspaceSchema)
      .query(async ({ ctx, input }) => {
        return await getAssetByWorkspace({
          db: ctx.db,
          input,
        });
      }),

    textSearch: protectedProcedure
      .input(ZSearchAssetSchema)
      .query(async ({ ctx, input }) => {
        return await searchAsset({
          db: ctx.db,
          input,
        });
      }),
  },
  create: protectedProcedure
    .input(ZAssetCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createAsset({
        db: ctx.db,
        input,
      });
    }),

  update: protectedProcedure
    .input(ZAssetUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateAsset({
        db: ctx.db,
        input,
        id: input.asset_id,
      });
    }),

  delete: protectedProcedure
    .input(ZAssetDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteAsset({
        db: ctx.db,
        input,
      });
    }),
});
