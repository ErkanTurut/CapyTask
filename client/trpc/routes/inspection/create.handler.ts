import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateInspcetionSchema } from "./create.schema";

type opts = {
  input: TCreateInspcetionSchema;
  db: SupabaseClient;
};

export const createInspectionHandler = async ({ input, db }: opts) => {
  return await db
    .from("inspection")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      inspection_snapshot_id: input.inspection_snapshot_id,
    })
    .throwOnError()
    .select("*");
};
