import { z } from "zod";

export const ZGetLocationByIdSchema = z.object({
  id: z.string(),
});

export type TGetLocationByIdSchema = z.infer<typeof ZGetLocationByIdSchema>;

export const ZGetLocationByWorkspaceSchema = z.object({
  url_key: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});

export type TGetLocationByWorkspaceSchema = z.infer<
  typeof ZGetLocationByWorkspaceSchema
>;

export const ZGetLocationByWorkOrderItemSchema = z.object({
  work_order_id: z.string(),
});

export type TGetLocationByWorkOrderItemSchema = z.infer<
  typeof ZGetLocationByWorkOrderItemSchema
>;

export const ZSearchLocationSchema = z.object({
  search: z.string(),
});

export type TSearchLocationSchema = z.infer<typeof ZSearchLocationSchema>;

export const ZCreateLocationSchema = z.object({
  address_id: z.string(),
  company_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  location_level: z.number().optional(),
  location_type: z.enum(["BUILDING", "FLOOR", "ROOM", "AREA", "OTHER"]),
  name: z.string(),
  parent_location_id: z.string().nullable().optional(),
  public_id: z.string().optional(),
  updated_at: z.string().optional(),
  workspace_id: z.string(),
});

export type TCreateLocationSchema = z.infer<typeof ZCreateLocationSchema>;

export const ZUpdateLocationSchema = z
  .object({
    address_id: z.string().optional(),
    company_id: z.string().nullable().optional(),
    created_at: z.string().optional(),
    description: z.string().nullable().optional(),
    id: z.string().optional(),
    location_level: z.number().optional(),
    location_type: z
      .enum(["BUILDING", "FLOOR", "ROOM", "AREA", "OTHER"])
      .optional(),
    name: z.string().optional(),
    parent_location_id: z.string().nullable().optional(),
    public_id: z.string().optional(),
    updated_at: z.string().optional(),
    workspace_id: z.string().optional(),
  })
  .merge(
    z.object({
      location_id: z.string(),
    })
  );

export type TUpdateLocationSchema = z.infer<typeof ZUpdateLocationSchema>;
