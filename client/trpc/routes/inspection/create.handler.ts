import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TCreateInspcetionSchema } from "./create.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TCreateInspcetionSchema;
  db: SupabaseClient;
};

export const createInspectionHandler = async ({ input, db }: opts) => {
  let inspection_snapshot_id = undefined;

  if (input.inspection_template_id) {
    const { data: inpsection_template } = await db
      .from("inspection_template")
      .select("*")
      .eq("id", input.inspection_template_id)
      .single()
      .throwOnError();

    if (!inpsection_template) {
      throw new TRPCError({
        message: "Inspection template not found",
        code: "NOT_FOUND",
      });
    }

    const { data: inspection_template_snapshot, error } = await db
      .from("inspection_template_snapshot")
      .upsert(
        {
          inspection_template_id: inpsection_template.id,
          name: inpsection_template.name,
          created_at: inpsection_template.updated_at,
        },
        { onConflict: "inspection_template_id, created_at" },
      )
      .select("*")
      .single();

    if (!inspection_template_snapshot || error) {
      throw new TRPCError({
        message: "Failed to create inspection snapshot",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    inspection_snapshot_id = inspection_template_snapshot.id;
  }

  return await db
    .from("inspection")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      inspection_snapshot_id: inspection_snapshot_id,
    })
    .throwOnError()
    .select("*");
};
