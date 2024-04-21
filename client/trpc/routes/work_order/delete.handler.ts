import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteWorkOrderSchema } from "./delete.schema";

type opts = {
  input: TDeleteWorkOrderSchema;
  db: SupabaseClient;
};

export const deleteWorkOrderHandler = async ({ input, db }: opts) => {
  return await db.from("work_order").delete().in("id", input.id).throwOnError();
};
