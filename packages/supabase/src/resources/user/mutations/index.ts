import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createUser({
  db,
  input,
}: {
  input: TablesInsert<"user">;
  db: Client;
}) {
  const { data } = await db
    .from("user")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateUser({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"user">;
  id: string;
}) {
  const { data } = await db
    .from("user")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
