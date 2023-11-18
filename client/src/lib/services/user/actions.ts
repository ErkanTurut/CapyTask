"use server";
import { Database } from "@/types/supabase.types";
import { cookies } from "next/headers";
import { accountSettingsSchema } from "@/lib/validations/settings";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";

// create type with accountSettingsSchema from zod
export type accountSettings = z.infer<typeof accountSettingsSchema>;

export async function updateUser(
  formData: Partial<accountSettings>,
  user_id: string
) {
  try {
    // const supabase = createServerActionClient<Database>({ cookies });
    const supabase = await createSupabaseServerClient();
    const data = accountSettingsSchema.parse(formData);
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    const { error } = await supabase
      .from("user")
      .update(data)
      .eq("id", user_id)
      .single();
    if (error) throw new Error(error.message);
    revalidateTag("user");
  } catch (err) {
    throw err;
  }
}
