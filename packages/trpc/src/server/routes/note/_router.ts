import "server-only";

import {
  createNote,
  getNotesByEntity,
} from "@gembuddy/supabase/resources/note";
import { protectedProcedure, router } from "../../trpc";
import { ZCreateNoteSchema, ZGetNoteByEntitySchema } from "./schema";

export const note = router({
  get: {
    byEntity: protectedProcedure
      .input(ZGetNoteByEntitySchema)
      .query(async ({ ctx, input }) => {
        return await getNotesByEntity({
          db: ctx.db,
          input,
        });
      }),
  },

  create: protectedProcedure
    .input(ZCreateNoteSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNote({
        db: ctx.db,
        input: {
          ...input,
          metadata: input.metadata ? JSON.stringify(input.metadata) : null,
        },
      });
    }),
});
