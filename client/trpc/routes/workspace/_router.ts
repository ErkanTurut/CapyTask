import { publicProcedure, router } from "@/trpc/trpc";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { TRPCClientError } from "@trpc/client";
import { ZCreateWorkspaceSchema } from "./create.schema";
import { createWorkspaceHandler } from "./create.handler";
import { ZGetWorkspaceSchema } from "./get.schema";
import {
  getWorkspaceByUserHandler,
  getWorkspaceByUrlKeyHandler,
} from "./get.handler";
import { z } from "zod";

export const workspace = router({
  create: publicProcedure
    .input(ZCreateWorkspaceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createWorkspaceHandler({
        input,
        db: createClient(cookies()),
        ctx,
      });
    }),
  getByUrlKey: publicProcedure
    .input(ZGetWorkspaceSchema.pick({ url_key: true }))
    .query(async ({ input }) => {
      return await getWorkspaceByUrlKeyHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  getByUser: publicProcedure
    .input(ZGetWorkspaceSchema.pick({ user_id: true }))
    .query(async ({ input }) => {
      return await getWorkspaceByUserHandler({
        db: createClient(cookies()),
        input,
      });
    }),
});
