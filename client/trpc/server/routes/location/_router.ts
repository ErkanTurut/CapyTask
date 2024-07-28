import { protectedProcedure, router } from "../../trpc";
import { getLocationByWorkspaceHandler } from "./get.handler";
import { ZGetLocationSchema } from "./get.schema";

export const location = router({
  get: {
    byWorkspace: protectedProcedure
      .input(ZGetLocationSchema.pick({ url_key: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getLocationByWorkspaceHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
