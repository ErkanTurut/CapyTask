import "server-only";
import type { Client } from "../../../types";

export async function getWorkOrderItemByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data, count } = await db
    .from("work_order_item")
    .select("*,asset(*),location(*)", {
      count: "exact",
    })
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data, count };
}

export async function getWorkOrderItemById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("work_order_item")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function searchWorkOrderItem({
  db,
  input,
}: {
  db: Client;
  input: {
    search: string;
  };
}) {
  const { data } = await db
    .from("work_order_item")
    .select("*, asset(*), location(*)")
    .textSearch("name", input.search.replace(/ /g, "%"), {
      type: "websearch",
    })
    .throwOnError();

  return { data };
}
