import { protectedProcedure, router } from "@/trpc/trpc";

export const inspection = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { data: "Hello" };
  }),
});
