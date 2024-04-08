import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getInspectionHandler,
  getInspectionStepsHandler,
  getInspectionsByIdentityHandler,
  searchInspectionHandler,
} from "./get.handler";
import { ZGetInspectionSchema } from "./get.schema";
import { ZCreateInspcetionSchema } from "./create.schema";
import { createInspectionHandler } from "./create.handler";
import { ZDeleteInspectionSchema } from "./delete.schema";
import { deleteInspectionHandler } from "./delete.handler";

export const inspection = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { data: "Hello" };
  }),
  get: router({
    byId: protectedProcedure
      .input(ZGetInspectionSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getInspectionHandler({
          input,
          db: ctx.db,
        });
      }),
    byTeamIdentity: protectedProcedure
      .input(ZGetInspectionSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getInspectionsByIdentityHandler({
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
  }),
  create: protectedProcedure
    .input(ZCreateInspcetionSchema)
    .mutation(async ({ ctx, input }) => {
      return await createInspectionHandler({
        input,
        db: ctx.db,
      });
    }),
  search: protectedProcedure
    .input(ZGetInspectionSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchInspectionHandler({
        input,
        db: ctx.db,
      });
    }),
  delete: protectedProcedure
    .input(ZDeleteInspectionSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteInspectionHandler({
        input,
        db: ctx.db,
      });
    }),
});
