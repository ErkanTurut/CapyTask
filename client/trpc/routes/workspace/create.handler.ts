import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";

import { TCreateWorkspaceSchema } from "./create.schema";
import type { Session } from "@supabase/supabase-js";

type opts = {
  input: TCreateWorkspaceSchema;
  db: SupabaseClient;
  ctx: {
    session: Session;
  };
};

export const createWorkspaceHandler = async ({ input, db, ctx }: opts) => {
  return await db
    .from("workspace")
    .insert({
      name: input.name,
      url_key: input.url_key,
      created_by: ctx.session.user.id,
    })
    .throwOnError();
};
