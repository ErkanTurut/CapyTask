import { authMutationRouter } from "./auth";
import { user } from "./user/_router";
import { team } from "./team/_router";
import { workspace } from "./workspace/_router";
import { inspection } from "./inspection/_router";
import { template } from "./template/_router";
import { router } from "@/trpc/trpc";

import { work_order } from "./work_order/_router";
import { work_step_status } from "./work_step_status/_router";

export const appRouter = router({
  auth: authMutationRouter,
  db: router({
    user,
    team,
    workspace,

    // old routes
    // inspection,
    // template,

    // new routes
    work_order,
    work_step_status,
  }),
});

export type AppRouter = typeof appRouter;
