import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "./trpc";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
          response.cookies.set({
            name,
            value,
            ...options,
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
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getSession();

  // if (!session) {
  //   return NextResponse.redirect(new URL("signin", request.url));
  // }

  // if (
  //   request.nextUrl.pathname === "/signin" ||
  //   (request.nextUrl.pathname === "/signup" && session)
  // ) {
  //   const workspaces = await serverClient.workspace.getWorkspaces.query();
  //   if (workspaces.length === 0) {
  //     return NextResponse.redirect(new URL("/create", request.url));
  //   }
  //   if (workspaces.length > 0) {
  //     return NextResponse.redirect(
  //       new URL(`/${workspaces[0].url_key}`, request.url)
  //     );
  //   }
  //   // console.log(request.nextUrl.pathname);
  //   // const { data, error } = await getWorkspace(slug);
  //   // console.log(data, error);
  //   // if (error || !data || data.length === 0) {
  //   //   return NextResponse.redirect(new URL("dashboard/create", request.url));
  //   // }
  //   // return NextResponse.redirect(
  //   //   new URL("/dashboard/account/settings", request.url)
  //   // );
  // }

  return response;
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
