import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateWorkPlanTemplateSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";
// import { cache } from "react";

type opts = {
  input: TCreateWorkPlanTemplateSchema;
  db: SupabaseClient;
};

export const createWorkPlanTemplateHandler = async ({ input, db }: opts) => {
  const { data, error } = await db
    .from("work_plan_template")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  if (!data || error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create inspection template",
      cause: {
        error,
      },
    });
  }

  return data;
};
