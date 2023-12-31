import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const DASHBOARD_PATH = "/dashboard";
const CREATE_PATH = "/create";
const SIGNIN_PATH = "/signin";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
      },
    },
  });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const redirectToDefaultWorkspace = async () => {
    const { data: workspaces } = await supabase.from("workspace").select("*");
    let url = new URL("/", request.url);
    if (!workspaces || workspaces.length < 1) {
      url = new URL("/create", request.url);
    } else {
      const workspaceCookie = request.cookies.get("gembuddy:workspace_url_key");

      const latestWorkspaceUrlKey: string | undefined = workspaceCookie
        ? JSON.parse(workspaceCookie.value)
        : undefined;

      const latestWorkspace =
        workspaces?.find(
          (workspace) => workspace?.url_key === latestWorkspaceUrlKey
        ) ?? workspaces?.[0];

      url = new URL(`/dashboard/${latestWorkspace.url_key}`, request.url);
    }
    return NextResponse.redirect(url);
  };

  const navigateToWorkspace = async (url_key: string) => {
    const { data: workspaces } = await supabase
      .from("workspace")
      .select("*")
      .eq("url_key", url_key);
    if (!workspaces || workspaces.length < 1) {
      return NextResponse.redirect(new URL("/create", request.url));
    }
    return NextResponse.next();
  };

  if (
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup"
  ) {
    if (!session) {
      return response;
    }
    return redirectToDefaultWorkspace();
  }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    const url_key = request.nextUrl.pathname.split("/")?.[2];
    if (!url_key) {
      return redirectToDefaultWorkspace();
    }
    if (url_key === "create" || url_key === "join") {
      return NextResponse.next();
    }
    return navigateToWorkspace(url_key);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
