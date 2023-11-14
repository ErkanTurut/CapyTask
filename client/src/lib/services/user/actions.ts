"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase.types";
import { cookies } from "next/headers";
import { accountSettingsSchema } from "@/lib/validations/settings";
import { z } from "zod";
import { revalidateTag } from "next/cache";

// create type with accountSettingsSchema from zod
export type accountSettings = z.infer<typeof accountSettingsSchema>;

export async function updateUser(
  formData: Partial<accountSettings>,
  user_id: string
) {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const data = accountSettingsSchema.parse(formData);
    //await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(data);
    const { error } = await supabase
      .from("user")
      .update(data)
      .eq("id", user_id)
      .single();
    console.log(error);
    if (error) throw new Error(error.message);
    revalidateTag("user");
  } catch (err) {
    throw err;
  }
}
