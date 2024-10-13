import "server-only";
import type { Client, TablesInsert, TablesUpdate } from "../../../types";

export async function createWorkOrderItem({
  db,
  input,
}: {
  input: TablesInsert<"work_order_item">;
  db: Client;
}) {
  const { data } = await db
    .from("work_order_item")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkOrderItem({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_order_item">;
  id: string;
}) {
  const { data } = await db
    .from("work_order_item")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
