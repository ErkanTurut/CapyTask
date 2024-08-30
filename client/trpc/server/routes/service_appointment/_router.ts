import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_appointment = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(z.object({ work_order_id: z.string() }))
      .query(async ({ ctx, input }) => {
        const { data, error, count } = await ctx.db
          .from("service_appointment")
          .select("*", { count: "exact" })
          .eq("work_order_id", input.work_order_id);

        if (error) {
          throw error;
        }

        return { data, count };
      }),
  },
  create: protectedProcedure
    .input(
      z.object({
        start_date: z.string(),
        end_date: z.string(),
        team_id: z.string(),
        work_order_id: z.string(),
        workspace_id: z.string(),
        assigned_resource: z.array(z.string()).optional(),
        work_order_item_id: z.string(),
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
