"use server";

import { ZodError, z } from "zod";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import createSupabaseServerClient from "../supabase/server";
import type { AuthResponse, AuthTokenResponse } from "@supabase/supabase-js";

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
      email: true,
      password,
    });

    const supabase = await createSupabaseServerClient();

    const res = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    return JSON.stringify(res);
  } catch (err) {
    throw JSON.stringify("An unknown error occurred");
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  supabase.auth.signOut();
}
