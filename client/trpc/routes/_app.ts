import { authMutationRouter } from "./auth";
import { user } from "./user/_router";
import { team } from "./team/_router";
import { workspace } from "./workspace/_router";
import { step } from "./step/_router";
import { plan } from "./plan/_router";
import { publicProcedure, router } from "@/trpc/trpc";

export const appRouter = router({
  auth: authMutationRouter,
  db: {
    user,
    team,
    workspace,
    step,
    plan,
  },
  test: publicProcedure.query(() => {
    return "test";
  }),
});

export type AppRouter = typeof appRouter;
