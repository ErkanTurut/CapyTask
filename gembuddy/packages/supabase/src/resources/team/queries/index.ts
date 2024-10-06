import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getTeamById(
  db: Client,
  input: {
    id: string;
  }
) {
  const { data } = await db
    .from("team")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getTeamByIdentity(
  db: Client,
  input: {
    identity: string;
  }
) {
  const { data } = await db
    .from("team")
    .select("*")
    .eq("identity", input.identity)
    .single()
    .throwOnError();

  return { data };
}

export async function getTeamByWorkspace(
  db: Client,
  input: {
    workspace_id: string;
  }
) {
  const { data } = await db
    .from("team")
    .select("*, workspace(id)")
    .eq("workspace.id", input.workspace_id)
    .throwOnError();

  return { data };
}

export async function getTeamByUrlKey(
  db: Client,
  input: {
    url_key: string;
  }
) {
  const { data } = await db
    .from("team")
    .select("*, workspace(url_key)")
    .eq("workspace.url_key", input.url_key)
    .throwOnError();

  return { data };
}
