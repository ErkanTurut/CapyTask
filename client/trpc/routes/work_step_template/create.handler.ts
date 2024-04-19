import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TCreateWorkStepTemplateSchema } from "./create.schema";
// import { cache } from "react";

type opts = {
  input: TCreateWorkStepTemplateSchema;
  db: SupabaseClient;
};

export const createWorkStepTemplateHandler = async ({ input, db }: opts) => {
  return await db.from("work_step_template").insert(input).select("*");
};
