import "server-only";

import type { Client, TablesInsert } from "../../../types";

export async function createAssignedResource({
  db,
  input,
}: {
  input: TablesInsert<"assigned_resource">;
  db: Client;
}) {
  const { data, error } = await db
    .from("assigned_resource")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  if (error) {
    throw error;
  }

  return { data };
}
