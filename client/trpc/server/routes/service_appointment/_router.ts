import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_appointment = router({
  create: protectedProcedure
    .input(
      z.object({
        start_date: z.string(),
        end_date: z.string(),
        team_id: z.string(),
        work_order_id: z.string(),
        workspace_id: z.string(),
        assigned_resource: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.db
        .from("service_appointment")
        .insert(input)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (input.assigned_resource) {
        await ctx.db
          .from("assigned_resource")
          .upsert(
            input.assigned_resource.map((resource_id) => ({
              service_appointment_id: data.id,
              service_resource_id: resource_id,
            })),
            {
              onConflict: "service_appointment_id,service_resource_id",
            },
          )
          .select();
      }
    }),
});
