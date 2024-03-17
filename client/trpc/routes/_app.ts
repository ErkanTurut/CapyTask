import { authMutationRouter } from "./auth";
import { user } from "./user/_router";
import { team } from "./team/_router";
import { workspace } from "./workspace/_router";
import { step } from "./step/_router";
import { inspection } from "./inspection/_router";
import { work_order } from "./work_order/_router";
import { router } from "@/trpc/trpc";
import { template } from "./template/_router";

export const appRouter = router({
  auth: authMutationRouter,
  db: router({
    user,
    team,
    workspace,
    step,
    inspection,
    work_order,
    template,
  }),
});

export type AppRouter = typeof appRouter;
