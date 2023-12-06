import createSupabaseServerClient from "@/lib/supabase/server";
import { publicProcedure, router } from "@/trpc/trpc";

import { TRPCError } from "@trpc/server";
import {
  accountSettingsSchema,
  TaccountSettingsSchema,
} from "@/lib/validations/settings";
import { cookies } from "next/headers";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase.types";

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

    // if (error) {
    //   throw new TRPCError({
    //     message: error.message,
    //     code: "INTERNAL_SERVER_ERROR",
    //   });
    // }
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

  // test: publicProcedure.query(async () => {
  //   // const supabase = await createSupabaseServerClient();
  //   const cookieStore = cookies();
  //   const token = cookies().get("token")?.value;

  //   const supabase = createServerClient<Database>(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //     {
  //       global: {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //       cookies: {
  //         get(name: string) {
  //           return cookieStore.get(name)?.value;
  //         },
  //         set(name: string, value: string, options: CookieOptions) {
  //           cookieStore.set({ name, value, ...options });
  //         },
  //         remove(name: string, options: CookieOptions) {
  //           cookieStore.set({ name, value: "", ...options });
  //         },
  //       },
  //     }
  //   );

  //   const { data, error } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("id", "78353bb2-b92b-4940-9892-70e8bed02022")
  //     .single();
  //   console.log(data, error);
  // }),
});
