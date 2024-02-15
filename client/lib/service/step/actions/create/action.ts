"use server";

import { createSafeAction } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZCreateStep } from "./schema";
import { ReturnType, TCreateStep } from "./types";

const handler = async (data: TCreateStep): Promise<ReturnType> => {
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
    .insert(data)
    .select("*");

  if (error) {
    return {
      error: error.message,
    };
  }
  // revalidateTag(`${data.plan_id}-steps`);

  return {
    data: steps,
  };
};

export const createStep = createSafeAction(ZCreateStep, handler);
