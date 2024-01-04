"use server";

import { createSafeAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { ReturnType, TSignIn } from "./types";

import { ZSignIn } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const handler = async (input: TSignIn): Promise<ReturnType> => {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

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
