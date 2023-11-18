"use server";

import { ZodError, z } from "zod";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import createSupabaseServerClient from "../supabase/server";
import type {
  AuthResponse,
  AuthTokenResponse,
  AuthError,
} from "@supabase/supabase-js";

export async function signUpWithPassword({
  email,
  password,
  confirmPassword,
}: z.infer<typeof signUpSchema>): Promise<AuthResponse> {
  try {
    const validatedData = signUpSchema.parse({
      email,
      password,
      confirmPassword,
    });

    const supabase = await createSupabaseServerClient();

    const res = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    return JSON.stringify(res) as unknown as AuthResponse;
  } catch (err) {
    throw JSON.stringify(new Error("An unknown error occurred"));
  }
}

export async function signInWithPassword({
  email,
  password,
}: z.infer<typeof signInSchema>): Promise<string> {
  try {
    const validatedData = signInSchema.parse({
      email,
      password,
    });

    const supabase = await createSupabaseServerClient();

    const res = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    return JSON.stringify(res);
  } catch (error: unknown) {
    throw JSON.stringify(error);
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  supabase.auth.signOut();
}
