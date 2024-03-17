import { SupabaseClient } from "@/lib/supabase/server";
import { TDeletePlanSchema } from "./delete.schema";
import { revalidatePath } from "next/cache";

export async function deletePlanHandler({
  db,
  input,
}: {
  input: TDeletePlanSchema;
  db: SupabaseClient;
}) {
  return await db.from("plan").delete().eq("id", input.id).throwOnError();
}
