import { publicProcedure, router } from "@/trpc/trpc";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";

import {
  getTeamByIdentityHandler,
  getTeamHandler,
  getTeamsByWorkspaceUrlKeyHandler,
} from "./get.handler";
import { ZGetTeamSchema } from "./get.schema";
import { updateTeamHandler } from "./update.handler";
import { ZUpdateTeamSchema } from "./update.schema";
import { ZCreateTeamSchema } from "./create.schema";
import { createTeamHandler } from "./create.handler";

export const team = router({
  create: publicProcedure
    .input(ZCreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await createTeamHandler({
        input,
        db: createClient(cookies()),
      });
    }),

  update: publicProcedure
    .input(ZUpdateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateTeamHandler({
        input,
        db: createClient(cookies()),
      });
    }),

  get: publicProcedure
    .input(ZGetTeamSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamHandler({ input, db: createClient(cookies()) });
    }),
  getByIdentity: publicProcedure
    .input(ZGetTeamSchema.pick({ identity: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  getByWorkspaceUrlKey: publicProcedure
    .input(ZGetTeamSchema.pick({ url_key: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamsByWorkspaceUrlKeyHandler({
        input,
        db: createClient(cookies()),
      });
    }),
});
