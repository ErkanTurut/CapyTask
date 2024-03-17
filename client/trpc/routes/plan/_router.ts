import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createStepHandler } from "./create.handler";
import { ZCreatePlanSchema } from "./create.schema";
import {
  getPlanHandler,
  getPlanStepsHandler,
  getPlansByIdentityHandler,
  getPlansByTeamIdHandler,
  searchPlanHandler,
} from "./get.handler";
import { ZGetPlanSchema } from "./get.schema";
import { ZDeletePlanSchema } from "./delete.schema";
import { deletePlanHandler } from "./delete.handler";

export const plan = router({
  // get: protectedProcedure
  //   .input(ZGetPlanSchema.pick({ id: true }))
  //   .query(async ({ ctx, input }) => {
  //     return await getPlanHandler({ input, db: createClient(cookies()) });
  //   }),

  get: router({
    byId: protectedProcedure
      .input(ZGetPlanSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getPlanHandler({ input, db: createClient(cookies()) });
      }),
    withSteps: protectedProcedure
      .input(ZGetPlanSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getPlanStepsHandler({
          input,
          db: createClient(cookies()),
        });
      }),
  }),

  getPlansByTeamId: protectedProcedure
    .input(ZGetPlanSchema.pick({ team_id: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getPlansByTeamIdHandler({
        input,
        db: createClient(cookies()),
      });
    }),

  getPlansByIdentity: protectedProcedure
    .input(ZGetPlanSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      const { data, count } = await getPlansByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
      return { data, count };
    }),

  searchPlan: protectedProcedure
    .input(ZGetPlanSchema.pick({ q: true, team_identity: true }))
    .mutation(async ({ ctx, input }) => {
      const { data, count } = await searchPlanHandler({
        input,
        db: createClient(cookies()),
      });
      return { data, count };
    }),

  create: protectedProcedure
    .input(ZCreatePlanSchema)
    .mutation(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: createClient(cookies()) });
    }),
  delete: protectedProcedure
    .input(ZDeletePlanSchema)
    .mutation(async ({ ctx, input }) => {
      return await deletePlanHandler({ input, db: createClient(cookies()) });
    }),
});
