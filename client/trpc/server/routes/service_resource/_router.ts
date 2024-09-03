import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_resource = router({
  get: {
    textSearch: protectedProcedure
      .input(
        z.object({
          // team_id: z.string(),
          search: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        // transform space to %
        const search = input.search.replace(/ /g, "%");

        const { data, error } = await db
          .from("service_resource")
          .select("*, user!inner(*)")
          .textSearch("user.full_name", search);

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
