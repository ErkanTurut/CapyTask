"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TAccountUpdate, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZAccountUpdate } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TAccountUpdate): Promise<ReturnType> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/signin");
  }

  const { data: user, error } = await supabase
    .from("user")
    .update(data)
    .eq("id", session.user.id)
    .select("*")
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath("/");
  return {
    data: user,
  };
};

export const updateUser = createSafeAction(ZAccountUpdate, handler);
