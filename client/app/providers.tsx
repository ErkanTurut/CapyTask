"use client";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import useWindowSize from "@/lib/hooks/use-window-size";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "@/trpc/client";
import superjson from "superjson";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
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
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          colorMode: "css",
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: `/api/trpc`,
          headers() {
            const header = new Map(headers);
            header.set("x-trpc-source", "nextjs-react");
            return Object.fromEntries(header);
          },
        }),
      ],
    }),
  );

  const { isMobile } = useWindowSize();
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration transformer={superjson}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {/* <TailwindIndicator /> */}

            {children}
            <Toaster
              closeButton
              position={isMobile ? "top-center" : "bottom-right"}
            />
          </NextThemesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </api.Provider>
  );
}
