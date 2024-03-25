import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createStepHandler } from "./create.handler";
import { ZCreateStepSchema } from "./create.schema";
import { deleteStepHandler } from "./delete.handler";
import { ZDeleteStepSchema } from "./delete.schema";
import {
  getStepHandler,
  getStepsByIdentityHandler,
  getStepsByInspectionHandler,
  searchStepsHandler,
} from "./get.handler";
import { ZGetStepSchema } from "./get.schema";
import { updateStepHandler } from "./update.handler";
import { ZUpdateStepSchema } from "./update.schema";
import { ZUpsertStepSchema } from "./upsert.schema";
import { upsertStepHandler } from "./upsert.handler";
import { sleep } from "@/lib/utils";

export const step = router({
  get: protectedProcedure
    .input(ZGetStepSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getStepHandler({ input, db: ctx.db });
    }),

  searchSteps: protectedProcedure
    .input(ZGetStepSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchStepsHandler({ input, db: ctx.db });
    }),

  getStepsByInspection: protectedProcedure
    .input(ZGetStepSchema.pick({ inspection_template_id: true }))
    .query(async ({ ctx, input }) => {
      const { data } = await getStepsByInspectionHandler({
        input,
        db: ctx.db,
      });
      return data;
    }),

  getStepsByIdentity: protectedProcedure
    .input(ZGetStepSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getStepsByIdentityHandler({
        input,
        db: ctx.db,
      });
    }),
  update: protectedProcedure
    .input(ZUpdateStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateStepHandler({ input, db: ctx.db });
    }),
  create: protectedProcedure
    .input(ZCreateStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: ctx.db });
    }),
  delete: protectedProcedure
    .input(ZDeleteStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteStepHandler({ input, db: ctx.db });
    }),
  upsert: protectedProcedure
    .input(ZUpsertStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await upsertStepHandler({ input, db: ctx.db });
    }),
});
