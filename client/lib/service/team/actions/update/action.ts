"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TUpdateTeam, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZUpdateTeam } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TUpdateTeam): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/signin");
  }

  const { data: team, error } = await supabase
    .from("team")
    .update(data)
    .eq("id", data.id)
    .select("*")
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/dashboard/`);

  return {
    data: team,
  };
};

export const updateTeam = createSafeAction(ZUpdateTeam, handler);
