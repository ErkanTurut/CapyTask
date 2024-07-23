import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TRPCError } from "@trpc/server";
import { TUpdateWorkOrderSchema } from "./update.schema";

type opts = {
  input: TUpdateWorkOrderSchema;
  db: SupabaseClient;
};

export const updateWorkOrderStatusHandler = async ({ input, db }: opts) => {
  return await db
    .from("work_order")
    .update({
      status: input.status,
    })
    .eq("id", input.id)
    .throwOnError();
};
