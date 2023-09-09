import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase.types";

import { otpCodeSchema } from "@/lib/validations/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { code } = otpCodeSchema.parse(res);
    console.log("code", code);
    if (code) {
      console.log("code", code);
      const supabase = createRouteHandlerClient<Database>({ cookies });
      await supabase.auth.verifyOtp({
        email: "erkamturut@gmail.com",
        token: code,
        type: "email",
      });
    }

    // // URL to redirect to after sign in process completes
    return NextResponse.redirect(request.nextUrl.origin);
  } catch (error) {
    console.log(error);
  }
}
