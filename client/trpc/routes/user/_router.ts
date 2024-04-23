import { protectedProcedure, router } from "@/trpc/trpc";
import { updateUserHandler } from "./update.handler";
import { ZUserUpdateSchema } from "./update.schema";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";

import { getUserHandler } from "./getUser.handler";
import { ZGetUserSchema } from "./getUser.schema";

export const user = router({
  update: protectedProcedure
    .input(ZUserUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return updateUserHandler({ input, db: ctx.db });
    }),
  get: protectedProcedure
    .input(ZGetUserSchema)
    .query(async ({ ctx, input }) => {
      return getUserHandler({ input, db: ctx.db });
    }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return getUserHandler({
      input: { id: ctx.session.user.id },
      db: ctx.db,
    });
  }),
});
