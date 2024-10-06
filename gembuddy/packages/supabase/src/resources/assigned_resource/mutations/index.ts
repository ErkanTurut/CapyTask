import "server-only";

import type { Client, TablesInsert } from "../../../types";

export async function createAssignedResource({
  db,
  input,
}: {
  input: TablesInsert<"assigned_resource">;
  db: Client;
}) {
  const { data } = await db
    .from("assigned_resource")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
