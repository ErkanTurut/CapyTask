import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase.types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log(code);
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(data, error);
    if (error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }

  const next = requestUrl.searchParams.get("next");
  if (next) {
    return NextResponse.redirect(next);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
