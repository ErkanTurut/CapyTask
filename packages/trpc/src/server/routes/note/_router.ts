import "server-only";

import { getNotesByWorkOrder } from "@gembuddy/supabase/resources/note";
import { protectedProcedure, router } from "../../trpc";
import { ZGetNoteByWorkOrderSchema } from "./schema";

export const note = router({
  get: {
    byWorkOrder: protectedProcedure
      .input(ZGetNoteByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getNotesByWorkOrder({
          db: ctx.db,
          input,
        });
      }),
  },
});
