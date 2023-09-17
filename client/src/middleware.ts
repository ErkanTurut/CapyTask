import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Database } from "./types/supabase.types";
import { authMiddleware, clerkClient } from "@clerk/nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  if (req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL("/dashboard/account/settings", req.url)
    );
  }

  return res;
}
