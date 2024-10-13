import "server-only";

import { protectedProcedure, router } from "../../trpc";
import {
  getLocationByWorkOrderItem,
  getLocationByWorkspace,
  createLocation,
  getLocationById,
  searchLocation,
  updateLocation,
} from "@gembuddy/supabase/resources/location";
import {
  ZCreateLocationSchema,
  ZGetLocationByIdSchema,
  ZGetLocationByWorkOrderItemSchema,
  ZGetLocationByWorkspaceSchema,
  ZSearchLocationSchema,
  ZUpdateLocationSchema,
} from "./shema";

export const location = router({
  get: {
    getLocationById: protectedProcedure
      .input(ZGetLocationByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getLocationById({
          db: ctx.db,
          input,
        });
      }),
    byWorkspace: protectedProcedure
      .input(ZGetLocationByWorkspaceSchema)
      .query(async ({ ctx, input }) => {
        return await getLocationByWorkspace({
          input,
          db: ctx.db,
        });
      }),
    byWorkOrderItem: protectedProcedure
      .input(ZGetLocationByWorkOrderItemSchema)
      .query(async ({ ctx, input }) => {
        return await getLocationByWorkOrderItem({
          input,
          db: ctx.db,
        });
      }),

    textSearch: protectedProcedure
      .input(ZSearchLocationSchema)
      .query(async ({ ctx, input }) => {
        return await searchLocation({
          db: ctx.db,
          input,
        });
      }),
  },

  create: protectedProcedure
    .input(ZCreateLocationSchema)
    .mutation(async ({ ctx, input }) => {
      return await createLocation({
        db: ctx.db,
        input,
      });
    }),

  update: protectedProcedure
    .input(ZUpdateLocationSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateLocation({
        db: ctx.db,
        input,
        id: input.location_id,
      });
    }),
});
