"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TCreatePlan, ReturnType } from "./types";
import { revalidateTag } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZCreatePlan } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TCreatePlan): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return redirect("/login");
  }
  const { data: plans, error } = await supabase
    .from("plan")
    .insert({
      name: data.name,
      description: data.description,
      team_id: data.team_id,
    })
    .select("*");
  if (error) {
    return {
      error: error.message,
    };
  }
  revalidateTag(`${data.team_id}-plans`);

  return {
    data: plans,
  };
};

export const createPlan = createSafeAction(ZCreatePlan, handler);
