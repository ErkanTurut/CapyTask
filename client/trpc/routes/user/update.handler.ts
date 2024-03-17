import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUserUpdateSchema } from "./update.schema";

type opts = {
  input: TUserUpdateSchema;
  db: SupabaseClient;
};

export const updateUserHandler = async ({ input, db }: opts) => {
  return await db
    .from("user")
    .update(input)
    .eq("id", input.id)
    .select("*")
    .single();
};
