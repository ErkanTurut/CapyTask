import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetAssignedResourceByWorkOrderSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

export async function getAssignedResourceByWorkOrder({
  db,
  input,
}: {
  db: SupabaseClient;
  input: TGetAssignedResourceByWorkOrderSchema;
}) {
  return await db
    .from("assigned_resource")
    .select("*, service_resource(*)", {
      count: "exact",
    })
    .eq("work_order_id", input.work_order_id)
    .throwOnError();
}
