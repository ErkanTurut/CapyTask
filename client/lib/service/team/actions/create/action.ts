"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TCreateTeam, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZCreateTeam } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TCreateTeam): Promise<ReturnType> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/signin");
  }

  const { error } = await supabase.from("team").insert({
    name: data.name,
    workspace_id: data.workspace_id,
    url_key: data.url_key,
  });

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`dashboard/${data.url_key}`);

  return {
    data: { success: true, url_key: data.url_key },
  };
};

export const createTeam = createSafeAction(ZCreateTeam, handler);
