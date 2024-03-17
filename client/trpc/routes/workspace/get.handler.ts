import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";

import { TGetWorkspaceSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: { url_key: TGetWorkspaceSchema["url_key"] };
  db: SupabaseClient;
};

export const getWorkspaceByUrlKeyHandler = async ({ input, db }: opts) => {
  return await db
    .from("workspace")
    .select("*")
    .eq("url_key", input.url_key)
    .single();
};

export const getWorkspaceByUserHandler = async ({
  input,
  db,
}: {
  input: { user_id: TGetWorkspaceSchema["user_id"] };
  db: SupabaseClient;
}) => {
  return await db
    .from("workspace")
    .select("*, user_workspace!inner(*)")
    .eq("user_workspace.user_id", input.user_id);
};
