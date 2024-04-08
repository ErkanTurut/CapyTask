import { protectedProcedure, router } from "@/trpc/trpc";

export const step = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { message: "Hello World" };
  }),
});
