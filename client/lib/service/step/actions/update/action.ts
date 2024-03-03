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

  revalidateTag(`01d397b3-4739-4e7b-b8c8-7d4e0f1f6780-steps`);

  // revalidatePath(
  //   "/[url_key]/team/[team_identity]/templates/steps/[step_id]",
  //   "page",
  // );

  return {
    data: step,
  };
};

export const updateStep = createSafeAction(ZUpdateStep, handler);
