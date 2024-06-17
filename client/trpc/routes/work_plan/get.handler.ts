import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { work_orderModel, work_planModel } from "@/prisma/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const inputZod = work_planModel.pick({
  work_plan_template_id: true,
});

export async function getWorkPlanByTemplateHandler({
  input,
  db,
}: {
  input: z.infer<typeof inputZod>;
  db: SupabaseClient;
}) {
  const { data: work_plan, error } = await db
    .from("work_plan")
    .select("*")
    .eq("work_plan_template_id", input.work_plan_template_id)
    .eq("created_at", work_plan_template.updated_at)
    .single();

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get work plan",
    });
  }
}
