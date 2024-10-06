import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getLocationById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("location")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getLocationByWorkspace({
  db,
  input,
}: {
  db: Client;
  input: {
    url_key: string;
    range: {
      from: number;
      to: number;
    };
  };
}) {
  const { data, count } = await db
    .from("location")
    .select("*, location(*), workspace!inner(*)", { count: "estimated" })
    .eq("workspace.url_key", input.url_key)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}

export async function getLocationByWorkOrderItem({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data, count } = await db
    .from("location")
    .select(
      "*, work_order_item(work_order_id), location!inner(*), address(*)",
      {
        count: "exact",
      }
    )
    .eq("work_order_item.work_order_id", input.work_order_id)
    .throwOnError();

  return { data, count };
}

export async function searchLocation({
  db,
  input,
}: {
  db: Client;
  input: {
    search: string;
  };
}) {
  const { data } = await db
    .from("location")
    .select()
    .textSearch("name", input.search.replace(/ /g, "%"), {
      type: "websearch",
    })
    .throwOnError();
}
