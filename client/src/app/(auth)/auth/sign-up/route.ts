import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations/auth";
import { AuthError } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = signUpSchema.parse(await request.json());
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    });
    console.log(data, error);
    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/signup/verify`, {
      status: 301,
    });
  } catch (error: Error | unknown) {
    if (
      error instanceof Error ||
      error instanceof AuthError ||
      error instanceof z.ZodError
    ) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json("An unknown error occurred", {
      status: 500,
    });
  }
}
