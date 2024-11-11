import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createWorkOrder({
  db,
  input,
}: {
  input: TablesInsert<"work_order">;
  db: Client;
}) {
  const { data } = await db
    .from("work_order")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function upsertWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: TablesInsert<"work_order">;
}) {
  const { data } = await db
    .from("work_order")
    .upsert(input, {
      onConflict: "id",
      ignoreDuplicates: true,
    })
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkOrder({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_order">;
  id: string;
}) {
  const { data } = await db
    .from("work_order")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function deleteWorkOrders({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string[];
  };
}) {
  const { status } = await db
    .from("work_order")
    .delete()
    .in("work_order_id", input.work_order_id)
    .throwOnError();

  return { status };
}
