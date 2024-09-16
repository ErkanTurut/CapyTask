import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import {
  getLocationByWorkOrder,
  getLocationByWorkspaceHandler,
} from "./get.handler";
import {
  ZGetLocationByWorkOrderSchema,
  ZGetLocationSchema,
} from "./get.schema";

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
    byWorkOrder: protectedProcedure
      .input(ZGetLocationByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getLocationByWorkOrder({
          input,
          db: ctx.db,
        });
      }),

    textSearch: protectedProcedure
      .input(
        z.object({
          search: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        // transform space to %
        const search = input.search.replace(/ /g, "%");

        const { data, error } = await db
          .from("location")
          .select("*, address(*), location(*)")
          .textSearch("name", search);

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
