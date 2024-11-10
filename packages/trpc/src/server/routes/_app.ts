import { authMutationRouter } from "./auth";
import { team } from "./team/_router";
import { user } from "./user/_router";
import { workspace } from "./workspace/_router";

import { router } from "../trpc";

import { asset } from "./asset/_router";
import { assigned_resource } from "./assigned_resource/_router";
import { company } from "./company/_router";
import { location } from "./location/_router";
import { note } from "./note/_router";
import { service_appointment } from "./service_appointment/_router";
import { service_resource } from "./service_resource/_router";
import { work_order } from "./work_order/_router";
import { work_order_history } from "./work_order_history/_router";
import { work_order_item } from "./work_order_item/_router";
import { work_plan } from "./work_plan/_router";
import { work_plan_template } from "./work_plan_template/_router";
import { work_step } from "./work_step/_router";
import { work_step_template } from "./work_step_template/_router";

export const appRouter = router({
  auth: authMutationRouter,
  db: router({
    user,
    team,
    workspace,

    work_order,
    work_order_history,
    work_order_item,

    assigned_resource,
    service_appointment,
    service_resource,

    work_plan,
    work_plan_template,

    work_step,
    work_step_template,

    note,

    asset,
    location,

    company,
  }),
});

export type AppRouter = typeof appRouter;
