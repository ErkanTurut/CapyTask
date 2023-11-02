"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase.types";
import { cookies } from "next/headers";
import { accountSettingsSchema } from "@/lib/validations/settings";
import { z } from "zod";
import type { user } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// create type with accountSettingsSchema from zod
export type accountSettings = z.infer<typeof accountSettingsSchema>;

export async function updateUser(
  formData: Partial<accountSettings>,
  user_id: string
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const data = accountSettingsSchema.parse(formData);
    //await new Promise((resolve) => setTimeout(resolve, 4000));
    const { error } = await supabase
      .from("user")
      .update(data)
      .eq("id", user_id)
      .single();

    // if (error) throw new Error(error.message);
    revalidateTag(`user`);
  } catch (err) {
    throw err;
  }
}
