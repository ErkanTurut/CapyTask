import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getNumber: publicProcedure.query(async () => {
    return 3;
  }),
});

export type AppRouter = typeof appRouter;
