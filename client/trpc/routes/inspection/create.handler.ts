import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateInspcetionSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";
import { upsertStepHandler } from "../step/upsert.handler";

type opts = {
  input: TCreateInspcetionSchema;
  db: SupabaseClient;
};

export const createInspectionHandler = async ({ input, db }: opts) => {
  let inspection_snapshot_id = null;

  if (input.inspection_template_id) {
    const { data, error } = await db.rpc("create_inspection_snapshot", {
      inspection_template_id_param: input.inspection_template_id,
    });

    if (error || !data) {
      throw new TRPCError({
        message: "Failed to create inspection snapshot",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    inspection_snapshot_id = data;
  }

  return await db
    .from("inspection")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      inspection_snapshot_id,
    })
    .select("*")
    .single()
    .throwOnError();
};
