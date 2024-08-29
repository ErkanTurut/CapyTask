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
          team_id: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        const { data, error } = await db
          .from("service_resource")
          .select("*, service_appointment(*), user(*)")
          .eq("team_id", input.team_id)
          .gte("service_appointment.start_date", input.scheduled_range.from)
          .lte("service_appointment.end_date", input.scheduled_range.to);

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
