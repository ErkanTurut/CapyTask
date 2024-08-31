import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_resource = router({
  get: {
    with_service_appointment: protectedProcedure
      .input(
        z.object({
          scheduled_range: z.object({
            from: z.string(),
            to: z.string(),
          }),
          // team_id: z.string(),
          search: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        const { data, error } = await db
          .from("service_resource")
          .select(
            "*, assigned_resource(service_appointment(*)), user(*), team(identity)",
          )
          // .eq("team.identity", input.team_identity)
          .gte(
            "assigned_resource.service_appointment.start_date",
            input.scheduled_range.from,
          )
          .lte(
            "assigned_resource.service_appointment.end_date",
            input.scheduled_range.to,
          );

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
        const { data, error } = await db
          .from("service_resource")
          .select("*, user!inner(*)")

          .textSearch("user.full_name", input.search);

        console.log(data, error);
        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
