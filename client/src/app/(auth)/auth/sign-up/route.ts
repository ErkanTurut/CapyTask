import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
export const dynamic = "force-dynamic";
import { signUpSchema } from "@/lib/validations/auth";
type Inputs = z.infer<typeof signUpSchema>;
import { PostgrestError } from "@supabase/supabase-js";
import { error } from "console";

export async function POST(request: Request) {
  //this route will receive stringified JSON from the client

  try {
    const requestUrl = new URL(request.url);
    const { email, password } = signUpSchema.parse(await request.json());
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.redirect(`${requestUrl.origin}/signup/verify-email`, {
      status: 301,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
