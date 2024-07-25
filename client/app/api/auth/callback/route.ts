import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  console.log("1 ====>", code);

  if (code) {
    console.log("2 ====>");
    const supabase = createClient();
    console.log("3 ====>");
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("====>", error);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
