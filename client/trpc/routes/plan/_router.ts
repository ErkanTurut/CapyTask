import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createStepHandler } from "./create.handler";
import { ZCreatePlanSchema } from "./create.schema";
import {
  getPlanHandler,
  getPlansByIdentityHandler,
  getPlansByTeamIdHandler,
  searchPlanHandler,
} from "./get.handler";
import { ZGetPlanSchema } from "./get.schema";
import { ZDeletePlanSchema } from "./delete.schema";
import { deletePlanHandler } from "./delete.handler";

export const plan = router({
  get: protectedProcedure
    .input(ZGetPlanSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getPlanHandler({ input, db: createClient(cookies()) });
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
      return await getPlansByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  searchPlan: protectedProcedure
    .input(ZGetPlanSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchPlanHandler({
        input,
        db: createClient(cookies()),
      });
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
