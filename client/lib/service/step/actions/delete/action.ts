"use server";

import { createSafeAction } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZDeleteStep } from "./schema";
import { ReturnType, TDeleteStep } from "./types";

const handler = async (data: TDeleteStep): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { error } = await supabase.from("step").delete().eq("id", data.id);

  if (error) {
    return {
      error: error.message,
    };
  }
  // revalidateTag(`${data.plan_id}-steps`);

  return {
    data: {
      success: true,
    },
  };
};

export const deleteStep = createSafeAction(ZDeleteStep, handler);
