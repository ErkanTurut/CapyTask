import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authSchema } from "@/lib/validations/auth";
import { AuthError } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    const phone = searchParams.get("phone");
    const token_hash = searchParams.get("token_hash");

    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.verifyOtp({
      email: "dfsds@gmail.com",
      token: "1234",
      type: "email",
    });
  } catch (error: Error | unknown) {
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
