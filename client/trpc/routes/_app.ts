import { authMutationRouter } from "./auth";
import { user } from "./user/_router";
import { team } from "./team/_router";
import { workspace } from "./workspace/_router";
import { step } from "./step/_router";
import { inspection } from "./inspection/_router";
import { template } from "./template/_router";

import { router } from "@/trpc/trpc";

export const appRouter = router({
  auth: authMutationRouter,
  db: router({
    user,
    team,
    workspace,
    step,
    inspection,
    template,
  }),
});

export type AppRouter = typeof appRouter;
