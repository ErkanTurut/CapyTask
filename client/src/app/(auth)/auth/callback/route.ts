import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase.types";

import { verfifyEmailSchema } from "@/lib/validations/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // const requestUrl = new URL(request.url);
  // const code = requestUrl.searchParams.get("code");
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const { code } = verfifyEmailSchema.parse(
    Object.fromEntries(formData.entries())
  );
  if (code) {
    console.log("code", code);
    // const supabase = createRouteHandlerClient<Database>({ cookies });
    // await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
