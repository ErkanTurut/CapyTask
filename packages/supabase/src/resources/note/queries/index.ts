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
