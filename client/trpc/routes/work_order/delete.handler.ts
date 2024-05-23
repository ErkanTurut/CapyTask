import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TDeleteWorkOrderSchema } from "./delete.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TDeleteWorkOrderSchema;
  db: SupabaseClient;
};

export const deleteWorkOrderHandler = async ({ input, db }: opts) => {
  await db.from("work_order").delete().in("id", input.id).throwOnError();
};
