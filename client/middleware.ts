import { NextRequest, NextResponse } from "next/server";

import { createClient } from "./lib/supabase/middleware";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next/static|_next/image|home|public|favicon.ico).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const { supabase, response } = createClient(req);

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (
      (!user &&
        path !== "/login" &&
        path !== "/signup" &&
        path !== "/logout") ||
      (user && path === "/signup")
    ) {
      return NextResponse.redirect(new URL("/login", req.url), {
        headers: response.headers,
      });
    } else if (user && path == "/login") {
      const { data: workspaces, error } = await supabase
        .from("workspace")
        .select("*, user_workspace!inner(*)")
        .eq("user_workspace.user_id", user.id);

      if (!workspaces || workspaces.length < 1 || error) {
        return NextResponse.redirect(new URL("/create", req.url), {
          headers: response.headers,
        });
      }
      let stored_workspace: { url_key: string } | null;
      try {
        stored_workspace = JSON.parse(
          req.cookies.get("workspace_url_key")?.value as string,
        );
      } catch (error) {
        stored_workspace = null;
      }
      const workspace =
        workspaces.find(
          (workspace) => workspace.url_key === stored_workspace?.url_key,
        ) || workspaces[0];

      if (!workspace) {
        return NextResponse.redirect(new URL("/create", req.url), {
          headers: response.headers,
        });
      }

      return NextResponse.redirect(new URL(`/${workspace.url_key}`, req.url), {
        headers: response.headers,
      });
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
      {
        headers: response.headers,
      },
    );
  }

  // special case for `vercel.pub` domain
  if (hostname === "vercel.pub") {
    return NextResponse.redirect(
      "https://vercel.com/blog/platforms-starter-kit",
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
