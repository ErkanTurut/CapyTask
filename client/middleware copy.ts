// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "./lib/supabase/middleware";
// import { Session } from "@supabase/supabase-js";
// import { SupabaseClient } from "./lib/supabase/server";

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|home|public|favicon.ico).*)"],
// };

// const publicAppRoutes = ["/login", "/signup", "/logout", "/api"];

// async function getHostname(req: NextRequest): Promise<string> {
//   let hostname = req.headers
//     .get("host")!
//     .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${
//       process.env.NEXT_PUBLIC_ROOT_DOMAIN
//     }`;
//   }

//   return hostname;
// }

// function getPathWithSearchParams(url: URL): string {
//   const searchParams = url.searchParams.toString();
//   return `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;
// }

// async function handleAppHostname(
//   req: NextRequest,
//   supabase: SupabaseClient,
//   path: string,
//   response: NextResponse,
// ): Promise<NextResponse> {
//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();

//   if (
//     (!session && !publicAppRoutes.includes(path)) ||
//     (session && path === "/signup")
//   ) {
//     return NextResponse.redirect(new URL("/login", req.url), {
//       headers: response.headers,
//     });
//   } else if (session && path === "/login") {
//     const { data: workspaces, error } = await supabase
//       .from("workspace")
//       .select("*, workspace_user(user_id, workspace_id)")
//       .eq("workspace_user.user_id", session.user.id);

//     if (!workspaces || workspaces.length < 1 || error) {
//       return NextResponse.redirect(new URL("/create", req.url), {
//         headers: response.headers,
//       });
//     }

//     let storedWorkspace: { url_key: string } | null = null;
//     try {
//       storedWorkspace = JSON.parse(
//         req.cookies.get("workspace_url_key")?.value as string,
//       );
//     } catch (error) {
//       storedWorkspace = null;
//     }

//     const workspace =
//       workspaces.find(
//         (workspace) => workspace.url_key === storedWorkspace?.url_key,
//       ) || workspaces[0];

//     if (!workspace) {
//       return NextResponse.redirect(new URL("/create", req.url), {
//         headers: response.headers,
//       });
//     }

//     return NextResponse.redirect(new URL(`/${workspace.url_key}`, req.url), {
//       headers: response.headers,
//     });
//   }

//   return NextResponse.rewrite(
//     new URL(`/app${path === "/" ? "" : path}`, req.url),
//     {
//       headers: response.headers,
//     },
//   );
// }

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;
//   const { supabase, response } = createClient(req);
//   const hostname = await getHostname(req);
//   const path = getPathWithSearchParams(url);

//   if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//     return handleAppHostname(req, supabase, path, response);
//   }

//   if (
//     hostname === "localhost:3000" ||
//     hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
//   ) {
//     return NextResponse.rewrite(
//       new URL(`/home${path === "/" ? "" : path}`, req.url),
//     );
//   }

//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
// }
