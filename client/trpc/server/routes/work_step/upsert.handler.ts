import "server-only";

import { Database, SupabaseClient } from "@/lib/supabase/server";
import { TRPCError } from "@trpc/server";
import { upsertWorkStepStatusHandler } from "../work_step_item/upsert.handler";

type opts = {
  db: SupabaseClient;
};

export async function upsertWorkStepsHandler({
  db,
  work_step,
}: {
  db: SupabaseClient;
  work_step: Database["public"]["Tables"]["work_step"]["Row"][];
}) {
  const { data, error } = await db
    .from("work_step")
    .upsert(work_step)
    .select("*");

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  return data;
}
