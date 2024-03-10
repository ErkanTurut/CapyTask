// src/trpc/server.ts
import type { AppRouter } from "./routes/_app";
import { loggerLink } from "@trpc/client";
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";

import { cookies } from "next/headers";
import superjson from "superjson";

export const trpc = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (op) => true,
        }),
        experimental_nextHttpLink({
          batch: true,
          url: process.env.NEXT_PUBLIC_ROOT_DOMAIN + "/api/trpc",
          // transformer: superjson,
          headers() {
            return {
              cookie: cookies().toString(),
              "x-trpc-source": "rsc-http",
            };
          },
        }),
      ],
    };
  },
});
