import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteInspectionSchema } from "./delete.schema";
import { revalidatePath } from "next/cache";

export async function deleteinspectionHandler({
  db,
  input,
}: {
  input: TDeleteInspectionSchema;
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .delete()
    .eq("id", input.id)
    .throwOnError();
}
