"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { TCreateTeam, ReturnType } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
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
    return redirect("/login");
  }
  // const { error } = await supabase.from("team").insert({
  //   name: data.name,
  //   workspace_id: data.workspace_id,
  //   indentity: data.indentity,
  // });
  // if (error) {
  //   return {
  //     error: error.message,
  //   };
  // }
  revalidateTag(`${session?.user.id}-${data.workspace_id}-teams`);
  return {
    data: { success: true, indentity: data.indentity },
  };
};

export const createTeam = createSafeAction(ZCreateTeam, handler);
