import { authMutationRouter } from "./auth";
import { user } from "./user/_router";
import { team } from "./team/_router";
import { workspace } from "./workspace/_router";

import { router } from "@/trpc/trpc";

import { work_order } from "./work_order/_router";
import { work_step_status } from "./work_step_status/_router";
import { work_plan } from "./work_plan/_router";
import { work_step } from "./work_step/_router";
import { work_plan_template } from "./work_plan_template/_router";
import { work_step_template } from "./work_step_template/_router";

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

    work_step,
    work_step_status,
    work_step_template,

    work_plan,
    work_plan_template,
  }),
});

export type AppRouter = typeof appRouter;
