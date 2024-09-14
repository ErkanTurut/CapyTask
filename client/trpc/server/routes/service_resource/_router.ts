import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_resource = router({
  get: {
    recommendation: protectedProcedure
      .input(
        z.object({
          team_identity: z.string(),
          from: z.string().datetime(),
          to: z.string().datetime(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        const { data, error } = await db
          .from("service_resource")
          .select(
            "*,team!inner(identity), user!inner(*), assigned_resource(service_appointment(*))",
          )
          .eq("team.identity", input.team_identity)
          .gt("assigned_resource.service_appointment.start_date", input.from)
          .lt("assigned_resource.service_appointment.end_date", input.to);
        if (error) {
          throw error;
        }
        return data;
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
          .from("service_resource")
          .select("*, user!inner(*), assigned_resource(service_appointment(*))")
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
