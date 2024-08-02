import { createClient } from "@/lib/supabase/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cookies } from "next/headers";
import { cache } from "react";

// const getUser = cache(async () => {
//   return await createClient(cookies()).auth.getUser();
// });

// export async function createContext(opts?: FetchCreateContextFnOptions) {
//   const {
//     data: { user },
//   } = await getUser();

//   return {
//     user,
//     headers: opts && Object.fromEntries(opts.req.headers),
//     db: createClient(cookies()),
//   };
// }

const getUser = cache(async () => {
  return await createClient(cookies()).auth.getUser();
});

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  const {
    data: { user },
  } = await getUser();

  return {
    user,
    headers: opts && Object.fromEntries(opts.req.headers),
    db: createClient(cookies()),
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
