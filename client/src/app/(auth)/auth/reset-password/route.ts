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
    console.log("s");
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${request.nextUrl.origin}/auth/callback?next=http://localhost:3000/products`,
    });
    console.log(data, error);
    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${request.nextUrl.origin}`, {
      status: 301,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
    if (error instanceof AuthError) {
      return NextResponse.json(error, {
        status: error.status,
      });
    }
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
