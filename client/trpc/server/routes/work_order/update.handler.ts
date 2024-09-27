import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TRPCError } from "@trpc/server";
import { TUpdateWorkOrderSchema } from "./update.schema";
import { Context } from "../../context";

type opts = {
  input: TUpdateWorkOrderSchema;
  db: SupabaseClient;
  ctx: Context;
};

export const updateWorkOrderStatusHandler = async ({
  input,
  db,
  ctx,
}: opts) => {
  const result = await db
    .from("work_order")
    .update({
      status: input.status,
    })
    .eq("id", input.id)
    .throwOnError();

  if (input.note) {
    await db
      .from("note")
      .insert({
        content: input.note,
        type: "STATUS_CHANGE",
        created_by_id: ctx.session?.user.id!,
        work_order_id: input.id,
      })
      .throwOnError();
  }

  return result;
};
