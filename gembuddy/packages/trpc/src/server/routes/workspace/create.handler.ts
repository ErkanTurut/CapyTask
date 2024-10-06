import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";

import { TCreateWorkspaceSchema } from "./create.schema";
import type { User } from "@supabase/supabase-js";

type opts = {
  input: TCreateWorkspaceSchema;
  db: SupabaseClient;
  user: User;
};

export const createWorkspaceHandler = async ({ input, db, user }: opts) => {
  return await db
    .from("workspace")
    .insert({
      name: input.name,
      url_key: input.url_key,
      created_by: user.id,
    })
    .throwOnError();
};
