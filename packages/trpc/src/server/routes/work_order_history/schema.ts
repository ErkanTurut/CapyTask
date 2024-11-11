import z from "zod";

export const ZGetWorkOrderHistoryByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});

export type TGetWorkOrderHistoryByWorkOrderSchema = z.infer<
  typeof ZGetWorkOrderHistoryByWorkOrderSchema
>;

export const ZCreateOneWorkOrderHistorySchema = z.object({
  created_at: z.string().optional(),
  field: z.string(),
  id: z.number().optional(),
  new_value: z.string(),
  old_value: z.string(),
  work_order_id: z.string(),
});

export type TCreateOneWorkOrderHistorySchema = z.infer<
  typeof ZCreateOneWorkOrderHistorySchema
>;
