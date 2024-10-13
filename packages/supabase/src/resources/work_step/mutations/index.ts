import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createWorkStep({
  db,
  input,
}: {
  input: TablesInsert<"work_step">;
  db: Client;
}) {
  const { data } = await db
    .from("work_step")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkStep({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_step">;
  id: string;
}) {
  const { data } = await db
    .from("work_step")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}
