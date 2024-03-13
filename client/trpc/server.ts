// src/trpc/server.ts
import type { AppRouter } from "./routes/_app";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { headers } from "next/headers";

import superjson from "superjson";

// export const trpc = experimental_createTRPCNextAppDirServer<AppRouter>({
//   config() {
//     return {
//       links: [
//         loggerLink({
//           enabled: (op) => true,
//         }),
//         experimental_nextHttpLink({
//           batch: true,
//           url: process.env.NEXT_PUBLIC_ROOT_DOMAIN + "/api/trpc",
//           transformer: superjson,
//           headers() {
//             return {
//               cookie: cookies().toString(),
//               "x-trpc-source": "rsc-http",
//             };
//           },
//         }),
//       ],
//     };
//   },
// });

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      transformer: superjson,
      url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/trpc`,
      headers: () => {
        const h = new Map(headers());
        h.set("x-trpc-source", "nextjs-react");
        return Object.fromEntries(h);
      },
    }),
  ],
});
