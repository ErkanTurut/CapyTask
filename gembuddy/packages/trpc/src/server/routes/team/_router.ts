import { protectedProcedure, router } from "../../trpc";

import { createTeamHandler } from "./create.handler";
import { ZCreateTeamSchema } from "./create.schema";
import {
  getTeamByIdentityHandler,
  getTeamHandler,
  getTeamsByWorkspaceUrlKeyHandler,
} from "./get.handler";
import { ZGetTeamSchema } from "./get.schema";
import { updateTeamHandler } from "./update.handler";
import { ZUpdateTeamSchema } from "./update.schema";

export const team = router({
  create: protectedProcedure
    .input(ZCreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await createTeamHandler({
        input,
        db: ctx.db,
      });
    }),

  update: protectedProcedure
    .input(ZUpdateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateTeamHandler({
        input,
        db: ctx.db,
      });
    }),

  get: protectedProcedure
    .input(ZGetTeamSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamHandler({ input, db: ctx.db });
    }),
  getByIdentity: protectedProcedure
    .input(ZGetTeamSchema.pick({ identity: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamByIdentityHandler({
        input,
        db: ctx.db,
      });
    }),
  getByWorkspaceUrlKey: protectedProcedure
    .input(ZGetTeamSchema.pick({ url_key: true }))
    .query(async ({ ctx, input }) => {
      return await getTeamsByWorkspaceUrlKeyHandler({
        input,
        db: ctx.db,
      });
    }),
});
