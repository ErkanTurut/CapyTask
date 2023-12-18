"use server";

import createSupabaseServerClient from "@/lib/supabase/server-actions";
import { TSignout, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";

import { ZSignout } from "./schema";

const handler = async (): Promise<ReturnType> => {
  const supabase = await createSupabaseServerClient();

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
