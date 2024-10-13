import "server-only";
// src/trpc/server.ts
import { appRouter } from "./";
import { loggerLink } from "@trpc/client";
import { cookies } from "next/headers";

import { createClient } from "@gembuddy/supabase/server";
import { cache } from "react";
import { createCallerFactory } from "./server/trpc";

const getSession = cache(async () => {
  return await createClient().auth.getSession();
});

// export const trpc =
// createCallerFactory(appRouter)(async () => {
//   loggerLink({
//     enabled: (opts) =>
//       process.env.NODE_ENV === "development" ||
//       (opts.direction === "down" && opts.result instanceof Error),
//   });

//   return {
//     session: (await getSession()).data.session,
//     headers: {
//       cookie: cookies().toString(),
//       "x-trpc-source": "rsc-invoke",
//     },
//     db: createClient(),
//   };
// });

export const trpc = createCallerFactory(appRouter)(
  cache(async () => {
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    });

    return {
      session: (await getSession()).data.session,
      headers: {
        cookie: cookies().toString(),
        "x-trpc-source": "rsc-invoke",
      },
      db: createClient(),
    };
  })
);
