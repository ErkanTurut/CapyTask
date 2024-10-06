import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkOrderItemByWorkOrderSchema } from "./get.schema";

export async function getWorkOrderItemByWorkOrderHandler({
  input,
  db,
}: {
  input: TGetWorkOrderItemByWorkOrderSchema;
  db: SupabaseClient;
}) {
  return await db
    .from("work_order_item")
    .select("*,asset(*),location(*)", {
      count: "exact",
    })
    .eq("work_order_id", input.work_order_id);
}
