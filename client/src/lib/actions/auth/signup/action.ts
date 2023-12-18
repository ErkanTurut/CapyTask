"use server";

import createSupabaseServerClient from "@/lib/supabase/server-actions";
import { TSignUp, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";

import { ZSignUp } from "./schema";

const handler = async (input: TSignUp): Promise<ReturnType> => {
  const supabase = await createSupabaseServerClient();

  const res = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (res.error) {
    return {
      error: res.error.message,
    };
  }
  revalidatePath(`/`);
  return {
    data: res,
  };
};

export const signup = createSafeAction(ZSignUp, handler);
