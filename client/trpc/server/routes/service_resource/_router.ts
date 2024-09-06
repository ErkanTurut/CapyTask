import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_resource = router({
  get: {
    test: protectedProcedure
      .input(
        z.object({
          from: z.string().datetime(),
          to: z.string().datetime(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        const { data, error } = await db
          .from("service_resource")
          .select("*, user(*), service_appointment(*)")
          .gt("service_appointment.start_date", input.from)
          .lt("service_appointment.end_date", input.to);
        if (error) {
          throw error;
        }
        return data;
      }),
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

        const { data: embedding, error: embeddingError } =
          await db.functions.invoke("embed", {
            body: JSON.stringify({ input: input.search }),
          });

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
