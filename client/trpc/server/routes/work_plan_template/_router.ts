import { sleep } from "@/lib/utils";
import { protectedProcedure, router } from "../../trpc";
import { createWorkPlanTemplateHandler } from "./create.handler";
import { ZCreateWorkPlanTemplateSchema } from "./create.schema";
import { deleteWorkPlanTemplateHandler } from "./delete.handler";
import { ZDeleteWorkPlanTemplateSchema } from "./delete.schema";
import {
  getWorkPlanTemplateHandler,
  getWorkPlanTemplateStepsHandler,
  getWorkPlanTemplatesByIdentityHandler,
  getWorkPlanTemplatesByTeamIdHandler,
  searchWorkPlanTemplateHandler,
} from "./get.handler";
import { ZGetWorkPlanTemplateSchema } from "./get.schema";

export const work_plan_template = router({
  get: router({
    byId: protectedProcedure
      .input(ZGetWorkPlanTemplateSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkPlanTemplateHandler({
          input,
          db: ctx.db,
        });
      }),
    withSteps: protectedProcedure
      .input(ZGetWorkPlanTemplateSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkPlanTemplateStepsHandler({
          input,
          db: ctx.db,
        });
      }),
    byTeamId: protectedProcedure
      .input(
        ZGetWorkPlanTemplateSchema.pick({ team_identity: true, range: true }),
      )
      .query(async ({ ctx, input }) => {
        const { data, count } = await getWorkPlanTemplatesByIdentityHandler({
          input,
          db: ctx.db,
        });
        return { data, count };
      }),
  }),

  getWorkPlanTemplatesByTeamId: protectedProcedure
    .input(ZGetWorkPlanTemplateSchema.pick({ team_id: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getWorkPlanTemplatesByTeamIdHandler({
        input,
        db: ctx.db,
      });
    }),

  getWorkPlanTemplatesByIdentity: protectedProcedure
    .input(
      ZGetWorkPlanTemplateSchema.pick({ team_identity: true, range: true }),
    )
    .query(async ({ ctx, input }) => {
      const { data, count } = await getWorkPlanTemplatesByIdentityHandler({
        input,
        db: ctx.db,
      });
      return { data, count };
    }),

  search: protectedProcedure
    .input(ZGetWorkPlanTemplateSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      const { data } = await searchWorkPlanTemplateHandler({
        input,
        db: ctx.db,
      });
      return data;
    }),

  create: protectedProcedure
    .input(ZCreateWorkPlanTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkPlanTemplateHandler({ input, db: ctx.db });
    }),
  delete: protectedProcedure
    .input(ZDeleteWorkPlanTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteWorkPlanTemplateHandler({
        input,
        db: ctx.db,
      });
    }),
});
