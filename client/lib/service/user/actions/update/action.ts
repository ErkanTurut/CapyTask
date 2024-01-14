"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TAccountUpdate, ReturnType } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZAccountUpdate } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TAccountUpdate): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
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

  revalidateTag(`${session?.user.id}-user`);
  return {
    data: user,
  };
};

export const updateUser = createSafeAction(ZAccountUpdate, handler);
