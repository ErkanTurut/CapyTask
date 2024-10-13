import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createLocation({
  db,
  input,
}: {
  input: TablesInsert<"location">;
  db: Client;
}) {
  const { data } = await db
    .from("location")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateLocation({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"location">;
  id: string;
}) {
  const { data } = await db
    .from("location")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
