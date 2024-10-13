import "server-only";

import { protectedProcedure, router } from "../../trpc";

import { getWorkPlanTemplatesByWorkspace } from "@gembuddy/supabase/resources/work_plan_template";
import { ZGetWorkPlanTemplatesByWorkspaceSchema } from "./schema";

export const work_plan = router({
  get: {
    byWorkspace: protectedProcedure
      .input(ZGetWorkPlanTemplatesByWorkspaceSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkPlanTemplatesByWorkspace({
          db: ctx.db,
          input,
        });
      }),
  },
});
