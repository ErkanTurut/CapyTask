"use server";

import { ZodError, z } from "zod";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import createSupabaseServerClient from "../supabase/server";
import type {
  AuthResponse,
  AuthTokenResponse,
  AuthError,
} from "@supabase/supabase-js";
import Router from "next/router";
import { redirect } from "next/navigation";

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

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
    if (error) throw error;
    return JSON.stringify(data) as unknown as AuthResponse;
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });
    if (error) throw error;

    return JSON.stringify(data);
  } catch (error: unknown) {
    throw JSON.stringify(error);
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  supabase.auth.signOut();
}
