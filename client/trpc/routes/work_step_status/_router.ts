import { protectedProcedure, router } from "@/trpc/trpc";

export const work_step_status = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { message: "Hello World" };
  }),
});
