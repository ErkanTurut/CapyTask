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


export async function createAssignedResourceMany({
  db,
  input,
}: {
  input: TablesInsert<"assigned_resource">[];
  db: Client;
}) {
  const { data, error } = await db
    .from("assigned_resource")
    .upsert(input, {        onConflict: "service_appointment_id,service_resource_id",
    })
    .select("*")
    .throwOnError();

  if (error) {
    throw error;
  }

  return { data };
}