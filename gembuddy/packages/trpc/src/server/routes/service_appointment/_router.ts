import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { createServiceAppointmentSchema } from "./create.schema";
import { createServiceAppointmentHandler } from "./create.handler";

export const service_appointment = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(z.object({ work_order_id: z.string() }))
      .query(async ({ ctx, input }) => {
        const { data, error, count } = await ctx.db
          .from("service_appointment")
          .select("*, assigned_resource(*)", { count: "exact" })
          .eq("work_order_id", input.work_order_id);

        if (error) {
          throw error;
        }

        return { data, count };
      }),
    byServiceResource: protectedProcedure
      .input(
        z.object({
          service_resource_id: z.string().array(),
          dateRange: z.object({
            from: z.string(),
            to: z.string(),
          }),
        }),
      )
      .query(async ({ ctx, input }) => {
        return await ctx.db
          .from("service_appointment")
          .select("*, assigned_resource!inner(*)", { count: "exact" })
          .in(
            "assigned_resource.service_resource_id",
            input.service_resource_id,
          )
          .gte("start_date", input.dateRange.from)
          .lte("end_date", input.dateRange.to);
      }),
  },
  create: protectedProcedure
    .input(createServiceAppointmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await createServiceAppointmentHandler({ db: ctx.db, input });
    }),

  delete: {
    many: protectedProcedure
      .input(z.object({ ids: z.string().array() }))
      .mutation(async ({ ctx, input }) => {
        return await ctx.db
          .from("service_appointment")
          .delete()
          .in("id", input.ids)
          .throwOnError();
      }),
  },
});
