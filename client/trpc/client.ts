import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./routes/_app";
import { createTRPCClient, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { unstable_httpBatchStreamLink } from "@trpc/client";

// export const trpc = createTRPCReact<AppRouter>({});

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),

    unstable_httpBatchStreamLink({
      transformer: superjson,
      url: `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN}/api/trpc`,
      //   headers() {
      //     const header = new Map(headers);
      //     header.set("x-trpc-source", "nextjs-react");
      //     return Object.fromEntries(header);
      //   },
    }),
  ],
});
