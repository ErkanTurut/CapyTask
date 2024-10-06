import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createServiceResource({
  db,
  input,
}: {
  input: TablesInsert<"service_resource">;
  db: Client;
}) {
  const { data } = await db
    .from("service_resource")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateServiceResource({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"service_resource">;
  id: string;
}) {
  const { data } = await db
    .from("service_resource")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
