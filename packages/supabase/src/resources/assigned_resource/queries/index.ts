import "server-only";

import type { Client, Database } from "../../../types";

export async function getAssignedResourceByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data, count } = await db
    .from("assigned_resource")
    .select("*, service_resource(*)", {
      count: "exact",
    })
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data, count };
}
