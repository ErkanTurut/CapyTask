import "server-only";

import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createCompany({
  db,
  input,
}: {
  input: TablesInsert<"company">;
  db: Client;
}) {
  const { data } = await db
    .from("company")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateCompany({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"company">;
  id: string;
}) {
  const { data } = await db
    .from("company")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
