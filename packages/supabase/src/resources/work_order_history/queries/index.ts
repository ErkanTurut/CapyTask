import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getWorkOrderHistoryByWorkOrderId({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data } = await db
    .from("work_order_history")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data };
}
