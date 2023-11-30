import createSupabaseServerClient from "@/lib/supabase/server";
import { publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";
import {
  accountSettingsSchema,
  TaccountSettingsSchema,
} from "@/lib/validations/settings";

export const userRouter = router({
  getCurrentUser: publicProcedure.query(async () => {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    const { data: user, error } = await supabase
      .from("user")
      .select()
      .eq("id", session.user.id)
      .single();

    if (error) {
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    return user;
  }),

  updateUser: publicProcedure
    .input(accountSettingsSchema)
    .mutation(async ({ input }) => {
      const supabase = await createSupabaseServerClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return null;
      }

      const { error } = await supabase
        .from("user")
        .update(input)
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return { success: true };
    }),
});
