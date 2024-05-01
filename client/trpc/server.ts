import "server-only";
// src/trpc/server.ts
import { AppRouter } from "./routes/_app";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { cookies, headers } from "next/headers";
import { appRouter } from "@/trpc";

import superjson from "superjson";

import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { experimental_nextCacheLink } from "@trpc/next/app-dir/links/nextCache";
import { createClient } from "@/lib/supabase/server";
import { createContext } from "./context";
import { createCallerFactory } from "./trpc";
import { cache } from "react";
// export const trpc = experimental_createTRPCNextAppDirServer<typeof appRouter>({
//   config() {
//     return {
//       links: [
//         loggerLink({
//           enabled: (op) => true,
//         }),
//         experimental_nextCacheLink({
//           transformer: superjson,
//           // requests are cached for 5 seconds
//           revalidate: 5,
//           router: appRouter,
//           async createContext() {
//             const supabase = createClient();
//             const {
//               data: { session },
//             } = await supabase.auth.getSession();
//             return {
//               session: session,
//               headers: {
//                 cookie: cookies().toString(),
//                 "x-trpc-source": "rsc-invoke",
//               },
//               db: supabase,
//             };
//           },
//         }),
//       ],
//     };
//   },
// });

// export const trpc = createTRPCClient<AppRouter>({
//   links: [
//     loggerLink({
//       enabled: (opts) =>
//         process.env.NODE_ENV === "development" ||
//         (opts.direction === "down" && opts.result instanceof Error),
//     }),
//     httpBatchLink({
//       transformer: superjson,
//       url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/trpc`,
//       headers: () => {
//         const h = new Map(headers());
//         h.set("x-trpc-source", "nextjs-react");
//         return Object.fromEntries(h);
//       },
//     }),
//   ],
// });

export const trpc = createCallerFactory(appRouter)(async () => {
  const supabase = createClient();
  const getSession = cache(() => supabase.auth.getSession());

  return {
    session: (await getSession()).data?.session,
    headers: {
      cookie: cookies().toString(),
      "x-trpc-source": "rsc-invoke",
    },
    db: supabase,
  };
});
