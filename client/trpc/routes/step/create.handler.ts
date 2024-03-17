import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TCreateStepSchema } from "./create.schema";
// import { cache } from "react";

type opts = {
  input: TCreateStepSchema;
  db: SupabaseClient;
};

export const createStepHandler = async ({ input, db }: opts) => {
  return await db.from("step").insert(input).select("*");
};
