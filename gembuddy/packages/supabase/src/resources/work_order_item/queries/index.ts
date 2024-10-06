import "server-only";
import type { Client } from "../../../types";

export async function geWorkOrderItemByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data } = await db
    .from("work_order_item")
    .select("*,asset(*),location(*)", {
      count: "exact",
    })
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data };
}
