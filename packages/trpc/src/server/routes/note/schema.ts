import z from "zod";

export const ZGetNoteByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});

export type TGetNoteByWorkOrderSchema = z.infer<
  typeof ZGetNoteByWorkOrderSchema
>;
