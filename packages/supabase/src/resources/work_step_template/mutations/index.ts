import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createWorkStepTemplate({
  db,
  input,
}: {
  input: TablesInsert<"work_step_template">;
  db: Client;
}) {
  const { data } = await db
    .from("work_step_template")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateWorkStepTemplate({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"work_step_template">;
  id: string;
}) {
  const { data } = await db
    .from("work_step_template")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function deleteWorkStepTemplate(
  db: Client,
  input: {
    work_step_template_id: string[];
  },
) {
  const { status } = await db
    .from("work_step_template")
    .delete()
    .in("work_step_template_id", input.work_step_template_id)
    .throwOnError();

  return { status };
}
