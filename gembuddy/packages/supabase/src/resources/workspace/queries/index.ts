import "server-only";
import type { Client } from "../../../types";

export async function getWorkspaceByUrlKey({
  db,
  url_key,
}: {
  url_key: string;
  db: Client;
}) {
  const { data } = await db
    .from("workspace")
    .select("*")
    .eq("url_key", url_key)
    .single()
    .throwOnError();

  return { data };
}

export async function getWorkspaceByUser({
  db,
  input,
}: {
  db: Client;
  input: {
    user_id: string;
  };
}) {
  const { data } = await db
    .from("workspace")
    .select("*, user(id)")
    .eq("user.id", input.user_id)
    .throwOnError();

  return { data };
}
