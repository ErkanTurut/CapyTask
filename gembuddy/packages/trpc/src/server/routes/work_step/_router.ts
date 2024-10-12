import "server-only";
import { protectedProcedure, router } from "../../trpc";
import {
  createWorkStep,
  updateWorkStep,
  getWorkStepsByWorkPlan,
  getWorkStepById,
} from "@gembuddy/supabase/resources/work_step";
import {
  ZCreateWorkStepSchema,
  ZUpdateWorkStepSchema,
  ZGetWorkStepsByWorkPlanSchema,
  ZGetWorkStepByIdSchema,
} from "./schema";

export const work_step = router({
  get: {
    byWorkPlan: protectedProcedure
      .input(ZGetWorkStepsByWorkPlanSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkStepsByWorkPlan({
          db: ctx.db,
          input,
        });
      }),
    byId: protectedProcedure
      .input(ZGetWorkStepByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkStepById({
          db: ctx.db,
          input,
        });
      }),
  },
  create: protectedProcedure
    .input(ZCreateWorkStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkStep({
        db: ctx.db,
        input,
      });
    }),
  update: protectedProcedure
    .input(ZUpdateWorkStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateWorkStep({
        db: ctx.db,
        input,
        id: input.work_step_id,
      });
    }),
});
