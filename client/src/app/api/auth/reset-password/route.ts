import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { checkEmailSchema } from "@/lib/validations/auth";
import { AuthError } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email } = checkEmailSchema.parse(await request.json());
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${request.nextUrl.origin}/auth/callback?next=http://localhost:3000/products`,
    });
    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${request.nextUrl.origin}`, {
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
