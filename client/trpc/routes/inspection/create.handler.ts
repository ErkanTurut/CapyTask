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
  const { data: inspection_snapshot_id, error } = await db.rpc(
    "create_inspection_snapshot",
    {
      inspection_template_id_param: input.inspection_template_id,
    },
  );

  if (error || !inspection_snapshot_id) {
    throw new TRPCError({
      message: "Failed to create inspection snapshot",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  const { data: inspection } = await db
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

  if (!inspection) {
    throw new TRPCError({
      message: "Failed to create inspection",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  const { data: step_snapshot } = await db
    .from("step_template_snapshot")
    .select("*")
    .eq("inspection_template_snapshot_id", inspection_snapshot_id);

  if (!step_snapshot) {
    throw new TRPCError({
      message: "Failed to create inspection snapshot",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  await upsertStepHandler({
    db,
    input: step_snapshot.map((step) => ({
      inspection_id: inspection.id,
      step_template_snapshot_id: step.id,
    })),
  });

  return inspection;
};
