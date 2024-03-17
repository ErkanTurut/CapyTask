import { SupabaseClient } from "@/lib/supabase/server";
import { TSignInSchema } from "./signin.schema";

type singinOptions = {
  input: TSignInSchema;
  db: SupabaseClient;
};

export const signinHandler = async ({ input, db }: singinOptions) => {
  return await db.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
};
