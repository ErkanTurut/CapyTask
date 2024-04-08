import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteInspectionSchema } from "./delete.schema";

type opts = {
  input: TDeleteInspectionSchema;
  db: SupabaseClient;
};

export const deleteInspectionHandler = async ({ input, db }: opts) => {
  return await db.from("inspection").delete().in("id", input.id).throwOnError();
};
