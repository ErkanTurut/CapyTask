import createSupabaseServerClient from "@/lib/supabase/server";
import { publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";

export const workspaceRouter = router({
  getWorkspaces: publicProcedure.query(async () => {
    const supabase = await createSupabaseServerClient();
    const { data: workspaces, error } = await supabase
      .from("workspace")
      .select("*");

    if (error) {
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    return workspaces;
  }),
});
