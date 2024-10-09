import { createAssignedResource } from "@gembuddy/supabase/resources/assigned_resource";
import { protectedProcedure, router } from "../../trpc";
import { ZCreateAssignedResourceSchema } from "./schema";
export const assigned_resource = router({
  create: protectedProcedure
    .input(ZCreateAssignedResourceSchema)
    .query(async ({ ctx, input }) => {
      return createAssignedResource({
        db: ctx.db,
        input,
      });
    }),
});
