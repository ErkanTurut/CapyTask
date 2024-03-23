import { protectedProcedure, router } from "@/trpc/trpc";
import { getInspectionsByIdentityHandler } from "./get.handler";
import { ZGetInspcetionSchema } from "./get.schema";
import { ZCreateInspcetionSchema } from "./create.schema";
import { createInspectionHandler } from "./create.handler";

export const inspection = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { data: "Hello" };
  }),
  get: router({
    byTeamIdentity: protectedProcedure
      .input(ZGetInspcetionSchema.pick({ team_identity: true, range: true }))
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
});
