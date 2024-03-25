import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getInspectionsByIdentityHandler,
  searchInspectionHandler,
} from "./get.handler";
import { ZGetInspectionSchema } from "./get.schema";
import { ZCreateInspcetionSchema } from "./create.schema";
import { createInspectionHandler } from "./create.handler";

export const inspection = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { data: "Hello" };
  }),
  get: router({
    byTeamIdentity: protectedProcedure
      .input(ZGetInspectionSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getInspectionsByIdentityHandler({
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
});
