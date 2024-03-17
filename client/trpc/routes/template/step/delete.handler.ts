import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteStepSchema } from "./delete.schema";

type opts = {
  input: TDeleteStepSchema;
  db: SupabaseClient;
};

export const deleteStepHandler = async ({ input, db }: opts) => {
  return await db.from("step").delete().eq("id", input.id);
};
