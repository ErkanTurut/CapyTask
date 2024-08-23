import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { getAssignedResourceByWorkOrder } from "./get.handler";
import { ZGetAssignedResourceByWorkOrderSchema } from "./get.schema";
import { sleep } from "@/lib/utils";

export const assigned_resource = router({
  test: protectedProcedure
    .input(
      z.object({
        //   work_order_id: z.string(),
        scheduled_range: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { data } = await ctx.db
        .from("service_appointment")
        .select("*")
        .rangeLt("appointment_range", input.scheduled_range);

      return data;
    }),
});
