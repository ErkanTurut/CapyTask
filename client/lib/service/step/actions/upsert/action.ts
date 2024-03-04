"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TZUpsertStep, ReturnType } from "./types";
import { createSafeAction } from "@/lib/safe-action";
import { ZUpsertStep } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { sleep } from "@/lib/utils";

const handler = async (data: TZUpsertStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }
  const { data: steps, error } = await supabase
    .from("step")
    .upsert(data)
    .select();

  if (steps) {
    const uniquePlanIds = new Set<string>();

    steps.forEach((step) => {
      uniquePlanIds.add(step.plan_id);
    });

    uniquePlanIds.forEach((planId) => {
      revalidateTag(`${planId}-steps`);
    });
  }

  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    data: steps,
  };
};

export const upsertStep = createSafeAction(ZUpsertStep, handler);
