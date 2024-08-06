import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TUpsertWorkStepStatusSchema } from "./upsert.schema";
import { TRPCError } from "@trpc/server";

export async function upsertWorkStepStatusHandler({
  db,
  work_step_item,
}: {
  db: SupabaseClient;
  work_step_item: TUpsertWorkStepStatusSchema;
}) {
  const { data, error } = await db
    .from("work_step_item")
    .upsert(work_step_item)
    .select("*");

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  return data;
}
