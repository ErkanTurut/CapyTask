import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TGetTeamSchema } from "./get.schema";
// import { cache } from "react";

type opts = {
  input: TGetTeamSchema;
  db: SupabaseClient;
};

export const getTeamHandler = async ({
  input,
  db,
}: {
  input: { id: TGetTeamSchema["id"] };
  db: SupabaseClient;
}) => {
  return await db.from("team").select("*").eq("id", input.id);
};

export const getTeamByIdentityHandler = async ({
  input,
  db,
}: {
  input: { identity: TGetTeamSchema["identity"] };
  db: SupabaseClient;
}) => {
  return await db
    .from("team")
    .select("*")
    .eq("identity", input.identity)
    .single();
};

export const getTeamsByWorkspaceUrlKeyHandler = async ({
  input,
  db,
}: {
  input: { url_key: TGetTeamSchema["url_key"] };
  db: SupabaseClient;
}) => {
  return await db
    .from("team")
    .select("*, workspace!inner(*)")
    .eq("workspace.url_key", input.url_key);
};
