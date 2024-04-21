import { protectedProcedure, router } from "@/trpc/trpc";
import { ZGetWorkStepStatusSchema } from "./get.schema";
import { getStepWithWorkOrderHandler } from "./get.handler";

export const work_step_status = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { message: "Hello World" };
  }),
  get: {
    withWorkOrder: protectedProcedure
      .input(ZGetWorkStepStatusSchema.pick({ work_order_id: true }))
      .query(async ({ input, ctx }) => {
        return getStepWithWorkOrderHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
