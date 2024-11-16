import type { Database } from "@gembuddy/supabase/types";
import z from "zod";

const EntityTypeEnum = ["work_order"] as const;

export const ZGetNoteByEntitySchema = z.object({
  entity_id: z.string(),
  entity_type: z.enum(EntityTypeEnum),
});

export type TGetNoteByEntitySchema = z.infer<typeof ZGetNoteByEntitySchema>;

export const ZCreateNoteSchema = z.object({
  content: z.string(),
  created_by: z.string(),
  entity_id: z.string(),
  entity_type: z.enum(EntityTypeEnum),
  embedding: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
});

export type TCreateNoteSchema = z.infer<typeof ZCreateNoteSchema>;
