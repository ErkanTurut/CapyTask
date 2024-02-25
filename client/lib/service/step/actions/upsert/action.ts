"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TUpsertStep, ReturnType } from "./types";
import { createSafeAction } from "@/lib/safe-action";
import { ZUpsertStep } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TUpsertStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }
  const { data: step, error } = await supabase
    .from("step")
    .upsert(data)
    .select("*");

  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    data: step,
  };
};

export const upsertStep = createSafeAction(ZUpsertStep, handler);
