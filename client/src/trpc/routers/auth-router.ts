import createSupabaseServerClient from "@/lib/supabase/server";
import { publicProcedure, router } from "../trpc";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import type { TSignInSchema, TSignUpSchema } from "@/lib/validations/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  signInWithPassword: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input }) => {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });
      if (error) {
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return data;
    }),

  signUpWithPassword: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      const supabase = await createSupabaseServerClient();

      const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          emailRedirectTo: "http://localhost:3000/",
        },
      });

      if (error) {
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return data;
    }),

  signOut: publicProcedure.mutation(async () => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new TRPCError({
        message: error.message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    return { success: true };
  }),
});
