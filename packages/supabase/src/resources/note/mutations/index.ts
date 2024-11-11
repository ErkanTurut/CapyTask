import "server-only";
import type {
  Client,
  Database,
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
