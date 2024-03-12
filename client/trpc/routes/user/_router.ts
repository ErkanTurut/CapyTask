import { protectedProcedure, router } from "@/trpc/trpc";
import { updateUserHandler } from "./update.handler";
import { ZUserUpdateSchema } from "./update.schema";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { TRPCClientError } from "@trpc/client";

import { getUserHandler } from "./getUser.handler";
import { ZGetUserSchema } from "./getUser.schema";

export const user = router({
  update: protectedProcedure
    .input(ZUserUpdateSchema)
    .mutation(async ({ input }) => {
      return updateUserHandler({ input, db: createClient(cookies()) });
    }),
  get: protectedProcedure
    .input(ZGetUserSchema)
    .query(async ({ ctx, input }) => {
      return getUserHandler({ input, db: createClient(cookies()) });
    }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return getUserHandler({
      input: { id: ctx.session.user.id },
      db: createClient(cookies()),
    });
  }),
});
