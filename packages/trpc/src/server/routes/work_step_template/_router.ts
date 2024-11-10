import "server-only";
import { protectedProcedure, router } from "../../trpc";
import {
  createWorkStepTemplate,
  updateWorkStepTemplate,
  deleteWorkStepTemplate,
  getWorkStepTemplateById,
  getWorkStepTemplatesByWorkPlanTemplate,
} from "@gembuddy/supabase/resources/work_step_template";
import {
  ZCreateWorkStepTemplateSchema,
  ZUpdateWorkStepTemplateSchema,
  ZDeleteWorkStepTemplateSchema,
  ZGetWorkStepTemplateByIdSchema,
  ZUpsertWorkStepTemplateSchema,
  ZGetWorkStepTemplatesByWorkPlanTemplateSchema,
} from "./schema";

export const work_step_template = router({
  get: {
    byId: protectedProcedure
      .input(ZGetWorkStepTemplateByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkStepTemplateById({ input, db: ctx.db });
      }),
    byWorkPlanTemplate: protectedProcedure
      .input(ZGetWorkStepTemplatesByWorkPlanTemplateSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkStepTemplatesByWorkPlanTemplate({
          input,
          db: ctx.db,
        });
      }),
  },

  update: protectedProcedure
    .input(ZUpdateWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateWorkStepTemplate({
        db: ctx.db,
        input,
        id: input.id,
      });
    }),

  create: protectedProcedure
    .input(ZCreateWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkStepTemplate({
        db: ctx.db,
        input,
      });
    }),

  delete: protectedProcedure
    .input(ZDeleteWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteWorkStepTemplate(ctx.db, input);
    }),

  upsert: protectedProcedure
    .input(ZUpsertWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      // Implement upsert logic here
      // This might involve checking if the item exists and then either updating or creating
      throw new Error("Upsert not implemented");
    }),
});
