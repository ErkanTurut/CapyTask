import { createClient } from "@/lib/supabase/server";
import { publicProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import {
  getPlanHandler,
  getPlansByIdentityHandler,
  getPlansByTeamIdHandler,
  searchPlanHandler,
} from "./get.handler";
import { ZGetPlanSchema } from "./get.schema";
import { ZCreatePlanSchema } from "./create.schema";
import { createStepHandler } from "./create.handler";

export const plan = router({
  get: publicProcedure
    .input(ZGetPlanSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getPlanHandler({ input, db: createClient(cookies()) });
    }),
  getPlansByTeamId: publicProcedure
    .input(ZGetPlanSchema.pick({ team_id: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getPlansByTeamIdHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  getPlansByIdentity: publicProcedure
    .input(ZGetPlanSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getPlansByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  searchPlan: publicProcedure
    .input(ZGetPlanSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchPlanHandler({
        input,
        db: createClient(cookies()),
      });
    }),

  create: publicProcedure
    .input(ZCreatePlanSchema)
    .mutation(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: createClient(cookies()) });
    }),
});
