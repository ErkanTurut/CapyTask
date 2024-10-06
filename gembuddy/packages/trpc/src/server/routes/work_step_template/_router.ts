import { sleep } from "@/lib/utils";
import { protectedProcedure, router } from "../../trpc";
import { createWorkStepTemplateHandler } from "./create.handler";
import { ZCreateWorkStepTemplateSchema } from "./create.schema";
import { deleteWorkStepTemplateHandler } from "./delete.handler";
import { ZDeleteWorkStepTemplateSchema } from "./delete.schema";
import {
  getStepHandler,
  getStepsByIdentityHandler,
  getStepsByWorkPlanTemplateHandler,
  searchStepsHandler,
} from "./get.handler";
import { ZGetWorkStepTemplateSchema } from "./get.schema";
import { updateWorkStepTemplateHandler } from "./update.handler";
import { ZUpdateWorkStepTemplateSchema } from "./update.schema";
import { upsertWorkStepTemplateHandler } from "./upsert.handler";
import { ZUpsertWorkStepTemplateSchema } from "./upsert.schema";
import { TRPCError } from "@trpc/server";

export const work_step_template = router({
  get: {
    byId: protectedProcedure
      .input(ZGetWorkStepTemplateSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        const { data } = await getStepHandler({ input, db: ctx.db });
        return data;
      }),
    byWorkPlanTemplate: protectedProcedure
      .input(ZGetWorkStepTemplateSchema.pick({ work_plan_template_id: true }))
      .query(async ({ ctx, input }) => {
        const { data } = await getStepsByWorkPlanTemplateHandler({
          input,
          db: ctx.db,
        });
        return data;
      }),
  },

  searchSteps: protectedProcedure
    .input(ZGetWorkStepTemplateSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchStepsHandler({ input, db: ctx.db });
    }),

  update: protectedProcedure
    .input(ZUpdateWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateWorkStepTemplateHandler({ input, db: ctx.db });
    }),

  create: protectedProcedure
    .input(ZCreateWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkStepTemplateHandler({ input, db: ctx.db });
    }),
  delete: protectedProcedure
    .input(ZDeleteWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteWorkStepTemplateHandler({ input, db: ctx.db });
    }),
  upsert: protectedProcedure
    .input(ZUpsertWorkStepTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await upsertWorkStepTemplateHandler({ input, db: ctx.db });
    }),
});
