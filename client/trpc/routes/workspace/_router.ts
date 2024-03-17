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

export const workspace = router({
  create: protectedProcedure
    .input(ZCreateWorkspaceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createWorkspaceHandler({
        input,
        db: createClient(cookies()),
        ctx,
      });
    }),
  getByUrlKey: protectedProcedure
    .input(ZGetWorkspaceSchema.pick({ url_key: true }))
    .query(async ({ input }) => {
      return await getWorkspaceByUrlKeyHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  getByUser: protectedProcedure
    .input(ZGetWorkspaceSchema.pick({ user_id: true }))
    .query(async ({ input }) => {
      return await getWorkspaceByUserHandler({
        db: createClient(cookies()),
        input,
      });
    }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return await getWorkspaceByUserHandler({
      db: createClient(cookies()),
      input: { user_id: ctx.session.user.id },
    });
  }),
});
