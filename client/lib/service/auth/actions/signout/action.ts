"use server";

import { TSignout, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";

import { ZSignout } from "./schema";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const handler = async (): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/`);

  return {
    data: { success: true },
  };
};

export const signout = createSafeAction(ZSignout, handler);
