"use client";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import useWindowSize from "@/lib/hooks/use-window-size";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import superjson from "superjson";
import {
  httpBatchLink,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function Providers({
  children,
  headers,
}: PropsWithChildren<{ headers: Headers }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            refetchOnMount: false,
          },
        },
      }),
  );
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         // transformer: superjson,
  //         url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/trpc`,
  //         fetch(url, options) {
  //           return fetch(url, {
  //             ...options,
  //             credentials: "include",
  //           });
  //         },
  //       }),
  //     ],
  //   }),
  // );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // loggerLink({
        //   enabled: (opts) =>
        //     process.env.NODE_ENV === "development" ||
        //     (opts.direction === "down" && opts.result instanceof Error),
        // }),
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN}/api/trpc`,
          headers() {
            const header = new Map(headers);
            header.set("x-trpc-source", "nextjs-react");
            return Object.fromEntries(header);
          },
        }),
      ],
    }),
  );

  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     // transformer,
  //     links: [
  //       unstable_httpBatchStreamLink({
  //         transformer: superjson,
  //         url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/trpc`,
  //         headers() {
  //           const header = new Map(headers);
  //           return Object.fromEntries(header);
  //         },
  //       }),
  //     ],
  //   }),
  // );

  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN}/api/trpc`,
  //         fetch(url, options) {
  //           return fetch(url, {
  //             ...options,
  //             credentials: "include",
  //           });
  //         },
  //       }),
  //     ],
  //   }),
  // );

  const { isMobile } = useWindowSize();
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration transformer={superjson}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <TailwindIndicator />
            {children}
            <Toaster
              closeButton
              position={isMobile ? "top-center" : "bottom-right"}
            />
          </NextThemesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
