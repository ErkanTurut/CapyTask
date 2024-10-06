import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createWorkspace({
  db,
  input,
}: {
  input: TablesInsert<"workspace">;
  db: Client;
}) {
  const { data } = await db
    .from("workspace")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkspace({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"workspace">;
  id: string;
}) {
  const { data } = await db
    .from("workspace")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function deleteWorkspace(
  db: Client,
  input: {
    workspace_id: string[];
  }
) {
  const { status } = await db
    .from("workspace")
    .delete()
    .in("workspace_id", input.workspace_id)
    .throwOnError();

  return { status };
}
