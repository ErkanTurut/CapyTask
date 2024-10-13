import z from "zod";

/*
   asset_id?: string | null;
    created_at?: string;
    id?: string;
    location_id?: string | null;
    status?: Database["public"]["Enums"]["Status"];
    updated_at?: string;
    work_order_id: string;
*/

export const ZCreateWorkOrderItemSchema = z.object({
  asset_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  location_id: z.string().nullable().optional(),
  status: z
    .enum(["OPEN", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELED"])
    .optional(),
  updated_at: z.string().optional(),
  work_order_id: z.string(),
});

export type TCreateWorkOrderItemSchema = z.infer<
  typeof ZCreateWorkOrderItemSchema
>;

/**
 *    asset_id?: string | null;
    created_at?: string;
    id?: string;
    location_id?: string | null;
    status?: Database["public"]["Enums"]["Status"];
    updated_at?: string;
    work_order_id?: string;
 */

export const ZUpdateWorkOrderItemSchema = z
  .object({
    asset_id: z.string().nullable().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
    location_id: z.string().nullable().optional(),
    status: z
      .enum(["OPEN", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELED"])
      .optional(),
    updated_at: z.string().optional(),
    work_order_id: z.string().optional(),
  })
  .merge(
    z.object({
      work_order_item_id: z.string(),
    })
  );

export type TUpdateWorkOrderItemSchema = z.infer<
  typeof ZUpdateWorkOrderItemSchema
>;

export const ZGetWorkOrderItemByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});

export type TGetWorkOrderItemByWorkOrderSchema = z.infer<
  typeof ZGetWorkOrderItemByWorkOrderSchema
>;

export const ZGetWorkOrderItemByIdSchema = z.object({
  id: z.string(),
});

export type TGetWorkOrderItemByIdSchema = z.infer<
  typeof ZGetWorkOrderItemByIdSchema
>;

export const ZSearchWorkOrderItemSchema = z.object({
  search: z.string(),
});

export type TSearchWorkOrderItemSchema = z.infer<
  typeof ZSearchWorkOrderItemSchema
>;
