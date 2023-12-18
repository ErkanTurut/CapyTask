"use server";

import createSupabaseServerClient from "@/lib/supabase/server-actions";
import { TSignIn, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";

import { ZSignIn } from "./schema";

const handler = async (input: TSignIn): Promise<ReturnType> => {
  const supabase = await createSupabaseServerClient();

  const res = await supabase.auth.signInWithPassword({
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

export const signin = createSafeAction(ZSignIn, handler);
