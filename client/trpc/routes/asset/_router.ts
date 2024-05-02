import { protectedProcedure, router } from "@/trpc/trpc";
import { getWorkOrdersByTeamHandler } from "./get.handler";
import { ZGetWorkOrderSchema } from "./get.schema";

export const asset = router({
  get: {
    byTeam: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrdersByTeamHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
