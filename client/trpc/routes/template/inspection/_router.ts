import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createStepHandler } from "./create.handler";
import { ZCreateInspectionSchema } from "./create.schema";
import {
  getInspectionHandler,
  getInspectionStepsHandler,
  getInspectionsByIdentityHandler,
  getInspectionsByTeamIdHandler,
  searchInspectionHandler,
} from "./get.handler";
import { ZGetInspectionSchema } from "./get.schema";
import { ZDeleteInspectionSchema } from "./delete.schema";
import { deleteinspectionHandler } from "./delete.handler";

export const inspection = router({
  get: router({
    byId: protectedProcedure
      .input(ZGetInspectionSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getInspectionHandler({
          input,
          db: ctx.db,
        });
      }),
    withSteps: protectedProcedure
      .input(ZGetInspectionSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getInspectionStepsHandler({
          input,
          db: ctx.db,
        });
      }),
    byTeamId: protectedProcedure
      .input(ZGetInspectionSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        const { data, count } = await getInspectionsByIdentityHandler({
          input,
          db: ctx.db,
        });
        return { data, count };
      }),
  }),

  getInspectionsByTeamId: protectedProcedure
    .input(ZGetInspectionSchema.pick({ team_id: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getInspectionsByTeamIdHandler({
        input,
        db: ctx.db,
      });
    }),

  getInspectionsByIdentity: protectedProcedure
    .input(ZGetInspectionSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      const { data, count } = await getInspectionsByIdentityHandler({
        input,
        db: ctx.db,
      });
      return { data, count };
    }),

  search: protectedProcedure
    .input(ZGetInspectionSchema.pick({ q: true, team_id: true }))
    .query(async ({ ctx, input }) => {
      const { data, count } = await searchInspectionHandler({
        input,
        db: ctx.db,
      });
      return data;
    }),

  create: protectedProcedure
    .input(ZCreateInspectionSchema)
    .mutation(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: ctx.db });
    }),
  delete: protectedProcedure
    .input(ZDeleteInspectionSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteinspectionHandler({
        input,
        db: ctx.db,
      });
    }),
});
