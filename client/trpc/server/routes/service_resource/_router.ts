import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_resource = router({
  test: protectedProcedure
    .input(
      z.object({
        scheduled_range: z.object({
          from: z.string(),
          to: z.string(),
        }),
      }),
    )
    .query(async ({ ctx: { db }, input }) => {
      const {data, error} = await db
        .from("service_resource")
        .select("*, service_appointment(*)")
        .gte("service_appointment.start_date", input.scheduled_range.from)
        .lte("service_appointment.end_date", input.scheduled_range.to);

      if (error) {
        throw error;
      }

      return data;
    }),
});
