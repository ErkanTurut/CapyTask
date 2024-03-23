import { createClient } from "@/lib/supabase/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cookies } from "next/headers";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const {
    data: { session },
  } = await createClient(cookies()).auth.getSession();

  return {
    session,
    headers: opts && Object.fromEntries(opts.req.headers),
    db: createClient(cookies()),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
