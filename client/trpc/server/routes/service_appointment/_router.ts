import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_appointment = router({
  test: protectedProcedure
    .input(
      z.object({
        scheduled_range: z
          .array(z.string().datetime({ offset: true }))
          .length(2),
      }),
    )
    .query(async ({ ctx: { db }, input }) => {
      const { data } = await db
        .from("service_resource")
        .select("*, service_appointment(*)")
        .gte("service_appointment.start_date", input.scheduled_range[0])
        .lte("service_appointment.end_date", input.scheduled_range[1]);

      console.log(`[${input.scheduled_range.toString()}]`);
      const { data: free_schedule, error } = await db.rpc("remove_overlaps", {
        main_range: input.scheduled_range,
        other_ranges: [
          `[${data[0].service_appointment[0].start_date},${data[0].service_appointment[0].end_date}]`,
          `[${data[0].service_appointment[1].start_date},${data[0].service_appointment[1].end_date}]`,
        ],
      });

      console.log(free_schedule, error);

      return data;
      // const { data } = await db
      //   .from("service_appointment")
      //   .select("*")
      //   .rangeLt("", input.scheduled_range.toString());

      // db.rpc("remove_overlaps", {main_range: input.scheduled_range.toString(), other_ranges: ["dsdsd", "dsdsd"]});
    }),
});
