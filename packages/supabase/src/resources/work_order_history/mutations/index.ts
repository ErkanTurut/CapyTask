import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createWorkOrderHistory({
  db,
  input,
}: {
  db: Client;
  input: TablesInsert<"work_order_history">;
}) {
  const { data } = await db
    .from("work_order_history")
    .insert(input)
    .single()
    .throwOnError();

  return { data };
}
