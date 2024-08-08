import "server-only";
import { SupabaseClient } from "@/lib/supabase/server";

import { TSearchCompanySchema } from "./get.schema";

type opts = {
  input: TSearchCompanySchema;
  db: SupabaseClient;
};

export const searchCompanyHandler = async ({ input, db }: opts) => {
  return await db.from("company").select().textSearch("name", input.query, {
    type: "websearch",
  });
};
