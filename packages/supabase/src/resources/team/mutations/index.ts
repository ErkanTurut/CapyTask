import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createTeam({
  db,
  input,
}: {
  input: TablesInsert<"team">;
  db: Client;
}) {
  const { data } = await db
    .from("team")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateTeam({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"team">;
  id: string;
}) {
  const { data } = await db
    .from("team")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
