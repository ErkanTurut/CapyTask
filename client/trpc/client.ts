import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./server/routes/_app";
export type { RouterInput, RouterOutput } from "./server/trpc";

export const api = createTRPCReact<AppRouter>();

// export const trpc = createTRPCClient<AppRouter>({
//   links: [
//     loggerLink({
//       enabled: (opts) =>
//         process.env.NODE_ENV === "development" ||
//         (opts.direction === "down" && opts.result instanceof Error),
//     }),
//     httpBatchLink({
//       transformer: superjson,
//       url: `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN}/api/trpc`,

//       // headers: () => {
//       //   const h = new Map(headers());
//       //   h.set("x-trpc-source", "nextjs-react");
//       //   return Object.fromEntries(h);
//       // },
//     }),
//     // unstable_httpBatchStreamLink({
//     //   transformer: superjson,
//     //   url: `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN}/api/trpc`,
//     //   //   headers() {
//     //   //     const header = new Map(headers);
//     //   //     header.set("x-trpc-source", "nextjs-react");
//     //   //     return Object.fromEntries(header);
//     //   //   },
//     // }),
//   ],
// });
