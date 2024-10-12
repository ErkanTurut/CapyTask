import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createUser,
  getCurrentUser,
  getUserById,
  updateUser,
} from "@gembuddy/supabase/resources/user";
import {
  ZCreateUserSchema,
  ZGetUserByIdSchema,
  ZUpdateUserSchema,
} from "./schema";

export const user = router({
  update: protectedProcedure
    .input(ZUpdateUserSchema)
    .mutation(async ({ input, ctx }) => {
      return updateUser({ input, db: ctx.db, id: input.user_id });
    }),
  get: {
    byId: protectedProcedure
      .input(ZGetUserByIdSchema)
      .query(async ({ ctx, input }) => {
        return getUserById({ input, db: ctx.db });
      }),
    currentUser: protectedProcedure.query(async ({ ctx }) => {
      return getUserById({
        db: ctx.db,
        input: {
          id: ctx.session.user.id,
        },
      });
    }),
  },
  create: protectedProcedure
    .input(ZCreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      return createUser({
        db: ctx.db,
        input,
      });
    }),
});
