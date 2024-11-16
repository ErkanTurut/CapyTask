import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getNotesByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data, count } = await db
    .from("note")
    .select()
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data, count };
}

export async function getNotesByEntity({
  db,
  input,
}: {
  db: Client;
  input: {
    entity_id: string;
    entity_type: keyof Database["public"]["Tables"];
  };
}) {
  const { data, count } = await db
    .from("note")
    .select()
    .eq("entity_id", input.entity_id)
    .eq("entity_type", input.entity_type)
    .throwOnError();

  return { data, count };
}
