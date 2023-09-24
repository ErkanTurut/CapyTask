import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const query = await request.json();
    console.log("query", query);

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.verifyOtp(query);

    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${requestUrl.origin}/signin`, {
      status: 301,
    });
  } catch (error: Error | unknown) {
    console.log("error", error);
    if (error instanceof Error || error instanceof AuthError) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json("An unknown error occurred", {
      status: 500,
    });
  }
}
