import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createTeam,
  getTeamById,
  getTeamByIdentity,
  getTeamByUrlKey,
  getTeamByWorkspace,
  updateTeam,
} from "@gembuddy/supabase/resources/team";
import {
  ZCreateTeamSchema,
  ZGetTeamByIdSchema,
  ZGetTeamByTeamIdentitySchema,
  ZGetTeamByUrlKeySchema,
  ZGetTeamByWorkspaceSchema,
  ZUpdateTeamSchema,
} from "./schema";

export const team = router({
  create: protectedProcedure
    .input(ZCreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await createTeam({
        input,
        db: ctx.db,
      });
    }),

  get: {
    byId: protectedProcedure
      .input(ZGetTeamByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getTeamById({
          input,
          db: ctx.db,
        });
      }),
    byIdentity: protectedProcedure
      .input(ZGetTeamByTeamIdentitySchema)
      .query(async ({ ctx, input }) => {
        return await getTeamByIdentity({
          input,
          db: ctx.db,
        });
      }),
    byUrlKey: protectedProcedure
      .input(ZGetTeamByUrlKeySchema)
      .query(async ({ ctx, input }) => {
        return await getTeamByUrlKey({
          input,
          db: ctx.db,
        });
      }),

    byWorkspace: protectedProcedure
      .input(ZGetTeamByWorkspaceSchema)
      .query(async ({ ctx, input }) => {
        return await getTeamByWorkspace({
          input,
          db: ctx.db,
        });
      }),
  },
  update: protectedProcedure
    .input(ZUpdateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateTeam({
        input,
        db: ctx.db,
        id: input.team_id,
      });
    }),
});
