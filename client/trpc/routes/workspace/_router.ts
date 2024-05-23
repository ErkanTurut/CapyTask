import { protectedProcedure, router } from "@/trpc/trpc";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { createWorkspaceHandler } from "./create.handler";
import { ZCreateWorkspaceSchema } from "./create.schema";
import {
  getWorkspaceByUrlKeyHandler,
  getWorkspaceByUserHandler,
} from "./get.handler";
import { ZGetWorkspaceSchema } from "./get.schema";
import { sleep } from "@/lib/utils";

export const workspace = router({
  create: protectedProcedure
    .input(ZCreateWorkspaceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createWorkspaceHandler({
        input,
        db: ctx.db,
        user: ctx.user,
      });
    }),
  getByUrlKey: protectedProcedure
    .input(ZGetWorkspaceSchema.pick({ url_key: true }))
    .query(async ({ input, ctx }) => {
      return await getWorkspaceByUrlKeyHandler({
        input,
        db: ctx.db,
      });
    }),
  getByUser: protectedProcedure
    .input(ZGetWorkspaceSchema.pick({ user_id: true }))
    .query(async ({ input, ctx }) => {
      return await getWorkspaceByUserHandler({
        db: ctx.db,
        input,
      });
    }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return await getWorkspaceByUserHandler({
      db: ctx.db,
      input: { user_id: ctx.user.id },
    });
  }),
});
