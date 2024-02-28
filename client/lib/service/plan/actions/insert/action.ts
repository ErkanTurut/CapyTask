"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TInsertPlanStep, ReturnType } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZInsertPlanStep } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TInsertPlanStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return redirect("/login");
  }
  const { data: plan_step, error } = await supabase
    .from("plan_step")
    .insert(data)
    .select("*")
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath("app/team/[team_identity]/templates/plans/[plan_id]");
  // revalidateTag(`${plan_step.id}-plans`);

  return {
    data: plan_step,
  };
};

export const insertPlanStep = createSafeAction(ZInsertPlanStep, handler);
