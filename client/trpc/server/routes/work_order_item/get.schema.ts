import * as z from "zod";

export const ZGetWorkOrderItemByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});
export type TGetWorkOrderItemByWorkOrderSchema = z.infer<
  typeof ZGetWorkOrderItemByWorkOrderSchema
>;
