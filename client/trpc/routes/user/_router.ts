import { publicProcedure, router } from "@/trpc/trpc";
import { updateUserHandler } from "./update.handler";
import { ZUserUpdateSchema } from "./update.schema";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { TRPCClientError } from "@trpc/client";

import { getUserHandler } from "./getUser.handler";
import { ZGetUserSchema } from "./getUser.schema";

export const user = router({
  update: publicProcedure
    .input(ZUserUpdateSchema)
    .mutation(async ({ input }) => {
      return updateUserHandler({ input, db: createClient(cookies()) });
    }),
  get: publicProcedure.input(ZGetUserSchema).query(async ({ ctx, input }) => {
    return getUserHandler({ input, db: createClient(cookies()) });
  }),
});
