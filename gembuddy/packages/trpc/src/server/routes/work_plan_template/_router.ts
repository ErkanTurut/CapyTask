import "server-only";
import { protectedProcedure, router } from "../../trpc";
import {
  getWorkPlanTemplateById,
  createWorkPlanTemplate,
  getWorkPlanTemplatesByWorkspace,
  updateWorkPlanTemplate,
} from "@gembuddy/supabase/resources/work_plan_template";
import {
  ZGetWorkPlanTemplateByIdSchema,
  ZCreateWorkPlanTemplateSchema,
  ZGetWorkPlanTemplateByWorkspaceSchema,
  ZUpdateWorkPlanTemplateSchema,
} from "./schema";

export const work_plan_template = router({
  get: router({
    byId: protectedProcedure
      .input(ZGetWorkPlanTemplateByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkPlanTemplateById({
          input,
          db: ctx.db,
        });
      }),
    byWorkspace: protectedProcedure
      .input(ZGetWorkPlanTemplateByWorkspaceSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkPlanTemplatesByWorkspace({
          input,
          db: ctx.db,
        });
      }),
  }),
  create: protectedProcedure
    .input(ZCreateWorkPlanTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkPlanTemplate({
        input,
        db: ctx.db,
      });
    }),

  update: protectedProcedure
    .input(ZUpdateWorkPlanTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateWorkPlanTemplate({
        input,
        db: ctx.db,
        id: input.work_plan_template_id,
      });
    }),
});
