import * as z from "zod";

export const ZGetAssignedResourceByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});

export type TGetAssignedResourceByWorkOrderSchema = z.infer<
  typeof ZGetAssignedResourceByWorkOrderSchema
>;
