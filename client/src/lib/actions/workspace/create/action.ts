"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
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

  const { data: workspace, error } = await supabase
    .from("workspace")
    .insert({
      name: data.name,
      url_key: data.url_key,
      created_by: session.user.id,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
  revalidatePath(`/${workspace.url_key}`);

  return {
    data: workspace,
  };
};

export const createWorkspace = createSafeAction(ZCreateWorkspace, handler);
