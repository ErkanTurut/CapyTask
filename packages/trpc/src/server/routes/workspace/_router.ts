import "server-only";

import { protectedProcedure, router } from "../../trpc";
import {
  createWorkspace,
  deleteWorkspaceMany,
  getWorkspaceByUrlKey,
  getWorkspaceByUser,
  updateWorkspace,
} from "@gembuddy/supabase/resources/workspace";

import {
  ZCreateWorkspaceSchema,
  ZDeleteWorkspaceManySchema,
  ZGetWorkspaceByUrlKeySchema,
  ZUpdateWorkspaceSchema,
  ZGetWorkspacesByUserSchema,
} from "./schema";

export const workspace = router({
  create: protectedProcedure
    .input(ZCreateWorkspaceSchema)
    .mutation(async ({ input, ctx }) => {
      return await createWorkspace({
        input,
        db: ctx.db,
      });
    }),
  update: protectedProcedure
    .input(ZUpdateWorkspaceSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateWorkspace({
        db: ctx.db,
        input,
        id: input.workspace_id,
      });
    }),

  delete: {
    many: protectedProcedure
      .input(ZDeleteWorkspaceManySchema)
      .mutation(async ({ input, ctx }) => {
        return await deleteWorkspaceMany({
          db: ctx.db,
          input,
        });
      }),
  },
  get: {
    byUrlKey: protectedProcedure
      .input(ZGetWorkspaceByUrlKeySchema)
      .query(async ({ input, ctx }) => {
        return await getWorkspaceByUrlKey({
          db: ctx.db,
          url_key: input.url_key,
        });
      }),
    byUser: protectedProcedure
      .input(ZGetWorkspacesByUserSchema)
      .query(async ({ input, ctx }) => {
        return await getWorkspaceByUser({
          db: ctx.db,
          input,
        });
      }),
    byCurrentUser: protectedProcedure.query(async ({ ctx }) => {
      return await getWorkspaceByUser({
        db: ctx.db,
        input: {
          user_id: ctx.session.user.id,
        },
      });
    }),
  },
});
