import { publicProcedure, router } from "@/trpc/trpc";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ZGetStepSchema } from "./get.schema";
import {
  getStepHandler,
  getStepsByIdentityHandler,
  getStepsByPlanHandler,
  searchStepsHandler,
} from "./get.handler";
import { updateStepHandler } from "./update.handler";
import { createStepHandler } from "./create.handler";
import { ZUpdateStepSchema } from "./update.schema";
import { ZCreateStepSchema } from "./create.schema";
import { ZDeleteStepSchema } from "./delete.schema";
import { deleteStepHandler } from "./delete.handler";

export const step = router({
  get: publicProcedure
    .input(ZGetStepSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getStepHandler({ input, db: createClient(cookies()) });
    }),

  searchSteps: publicProcedure
    .input(ZGetStepSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchStepsHandler({ input, db: createClient(cookies()) });
    }),

  getStepsByPlan: publicProcedure
    .input(ZGetStepSchema.pick({ plan_id: true }))
    .query(async ({ ctx, input }) => {
      return await getStepsByPlanHandler({
        input,
        db: createClient(cookies()),
      });
    }),

  getStepsByIdentity: publicProcedure
    .input(ZGetStepSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getStepsByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  update: publicProcedure
    .input(ZUpdateStepSchema)
    .query(async ({ ctx, input }) => {
      return await updateStepHandler({ input, db: createClient(cookies()) });
    }),
  create: publicProcedure
    .input(ZCreateStepSchema)
    .query(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: createClient(cookies()) });
    }),
  delete: publicProcedure
    .input(ZDeleteStepSchema)
    .query(async ({ ctx, input }) => {
      return await deleteStepHandler({ input, db: createClient(cookies()) });
    }),
});
