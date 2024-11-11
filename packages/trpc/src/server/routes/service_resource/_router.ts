import "server-only";
import { protectedProcedure, router } from "../../trpc";

import { getServiceAppointmentByUser } from "@gembuddy/supabase/resources";
import {
  createServiceResource,
  getRecommendation,
  getServiceResourceById,
  searchServiceResource,
  updateServiceResource,
} from "@gembuddy/supabase/resources/service_resource";
import {
  ZCreateServiceResourceSchema,
  ZGetServiceResourceByIdSchema,
  ZGetServiceResourceByUserSchema,
  ZGetServiceResourceRecommendationSchema,
  ZSearchServiceResourceSchema,
  ZUpdateServiceResourceSchema,
} from "./schema";

export const service_resource = router({
  get: {
    byId: protectedProcedure
      .input(ZGetServiceResourceByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceResourceById({
          db: ctx.db,
          input,
        });
      }),

    byUser: protectedProcedure
      .input(ZGetServiceResourceByUserSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceAppointmentByUser({
          db: ctx.db,
          input,
        });
      }),

    recommendation: protectedProcedure
      .input(ZGetServiceResourceRecommendationSchema)
      .query(async ({ ctx, input }) => {
        return await getRecommendation({
          db: ctx.db,
          input,
        });
      }),
    textSearch: protectedProcedure
      .input(ZSearchServiceResourceSchema)
      .query(async ({ ctx, input }) => {
        return await searchServiceResource({
          db: ctx.db,
          input,
        });
      }),
  },
  update: protectedProcedure
    .input(ZUpdateServiceResourceSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateServiceResource({
        db: ctx.db,
        input,
        id: input.service_resource_id,
      });
    }),

  create: protectedProcedure
    .input(ZCreateServiceResourceSchema)
    .mutation(async ({ ctx, input }) => {
      return await createServiceResource({
        db: ctx.db,
        input,
      });
    }),
});
