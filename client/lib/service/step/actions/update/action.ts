"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TUpdateStep, ReturnType } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZUpdateStep } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TUpdateStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   return redirect("/login");
  // }
  const { data: step, error } = await supabase
    .from("step")
    .update(data)
    .eq("id", data.id)
    .select("*")
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidateTag(`${step.id}-step`);

  return {
    data: step,
  };
};

export const updateStep = createSafeAction(ZUpdateStep, handler);
