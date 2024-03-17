import { publicProcedure, router } from "@/trpc/trpc";
import { ZSignInSchema } from "./signin.schema";
import { signinHandler } from "./signin.handler";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";

export const authMutationRouter = router({
  signin: publicProcedure
    .input(ZSignInSchema)
    .mutation(async ({ ctx, input }) => {
      return signinHandler({ input, db: createClient(cookies()) });
    }),
});
