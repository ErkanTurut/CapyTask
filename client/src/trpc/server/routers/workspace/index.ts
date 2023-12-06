import createSupabaseServerClient from "@/lib/supabase/server";
import { publicProcedure, router } from "@/trpc/trpc";

import { TRPCError } from "@trpc/server";

import * as z from "zod";

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

  getWorkspaceById: publicProcedure
    .input(
      z.object({
        url_key: z.string(),
      })
    )
    .query(async ({ input }) => {
      const supabase = await createSupabaseServerClient();
      return await supabase
        .from("workspace")
        .select("*")
        .eq("url_key", input.url_key);
    }),
});
