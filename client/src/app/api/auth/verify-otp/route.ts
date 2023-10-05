import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@supabase/supabase-js";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const query = await request.json();

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.verifyOtp(query);

    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${requestUrl.origin}${query.nextUrl}`, {
      status: 301,
    });
  } catch (error: Error | unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error || error instanceof AuthError) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json("An unknown error occurred", {
      status: 500,
    });
  }
}
