import "server-only";
import type {
  Client,
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createNote({
  db,
  input,
}: {
  db: Client;
  input: TablesInsert<"note">;
}) {
  const { data } = await db.from("note").insert(input).throwOnError();
  return data;
}

export async function updateNote({
  db,
  input,
}: {
  db: Client;
  input: TablesUpdate<"note">;
}) {
  const { data } = await db.from("note").update(input).throwOnError();
  return data;
}

export async function deleteNote({
  db,
  input,
}: {
  db: Client;
  input: { id: Tables<"note">["id"] };
}) {
  const { data } = await db
    .from("note")
    .delete()
    .eq("id", input.id)
    .throwOnError();
  return data;
}
