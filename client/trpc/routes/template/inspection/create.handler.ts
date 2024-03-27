import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateInspectionSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";
// import { cache } from "react";

type opts = {
  input: TCreateInspectionSchema;
  db: SupabaseClient;
};

export const createStepHandler = async ({ input, db }: opts) => {
  const { data, error } = await db
    .from("inspection_template")
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
