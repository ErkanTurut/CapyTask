import "server-only";
// src/trpc/server.ts
import { appRouter } from "@/trpc";
import { loggerLink } from "@trpc/client";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import { createCallerFactory } from "./server/trpc";

export const trpc = createCallerFactory(appRouter)(async () => {
  loggerLink({
    enabled: (opts) =>
      process.env.NODE_ENV === "development" ||
      (opts.direction === "down" && opts.result instanceof Error),
  });

  const supabase = createClient();
  const getUser = cache(() => supabase.auth.getUser());

  return {
    user: (await getUser()).data.user,
    headers: {
      cookie: cookies().toString(),
      "x-trpc-source": "rsc-invoke",
    },
    db: supabase,
  };
});
