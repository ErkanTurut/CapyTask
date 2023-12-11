"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import {
  TRPCClientErrorLike,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { getUrl, transformer } from "@/trpc/shared";
import { AppRouter } from "@/trpc";
import { Maybe } from "@trpc/server";

const Providers = ({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000,
            retry(failureCount, _err) {
              const err = _err as never as Maybe<
                TRPCClientErrorLike<AppRouter>
              >;
              const code = err?.data?.code;
              if (
                code === "BAD_REQUEST" ||
                code === "FORBIDDEN" ||
                code === "UNAUTHORIZED"
              ) {
                // if input data is wrong or you're not authorized there's no point retrying a query
                return false;
              }
              const MAX_QUERY_RETRIES = 3;
              return failureCount < MAX_QUERY_RETRIES;
            },
          },
        },
      })
  );
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
  //         fetch(url, options) {
  //           return fetch(url, {
  //             ...options,
  //             credentials: "include",
  //           });
  //         },
  //       }),
  //     ],
  //   })
  // );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
