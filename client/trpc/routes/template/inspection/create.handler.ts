import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreatePlanSchema } from "./create.schema";
// import { cache } from "react";

type opts = {
  input: TCreatePlanSchema;
  db: SupabaseClient;
};

export const createStepHandler = async ({ input, db }: opts) => {
  return await db.from("inspection_template").insert(input).select("*");
};
