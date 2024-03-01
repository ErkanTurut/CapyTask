"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TUpsertPlanStep, ReturnType } from "./types";
import { createSafeAction } from "@/lib/safe-action";
import { ZUpsertPlanStep } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const handler = async (data: TUpsertPlanStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }
  const { data: step, error } = await supabase
    .from("plan_step")
    .upsert(data)
    .select("*");

  revalidatePath("/app/team/[team_identity]/templates/plans/[plan_id]");

  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    data: step,
  };
};

export const upsertPlanStep = createSafeAction(ZUpsertPlanStep, handler);
