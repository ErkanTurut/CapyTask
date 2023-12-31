"use server";

import createSupabaseServerClient from "@/lib/supabase/server-actions";
import { TCreateWorkspace, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-action";
import { ZCreateWorkspace } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: TCreateWorkspace): Promise<ReturnType> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/signin");
  }

  const { error } = await supabase
    .from("workspace")
    .insert({
      name: data.name,
      url_key: data.url_key,
      created_by: session.user.id,
    })
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/${data.url_key}`);

  return {
    data: { success: true, url_key: data.url_key },
  };
};

export const createWorkspace = createSafeAction(ZCreateWorkspace, handler);
