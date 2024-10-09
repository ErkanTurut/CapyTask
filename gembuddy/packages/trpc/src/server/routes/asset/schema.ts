import * as z from "zod";

export const ZGetAssetByTeam = z.object({
  team_identity: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});

export type TGetAssetByTeam = z.infer<typeof ZGetAssetByTeam>;

export const ZGetAssetByWorkspace = z.object({
  url_key: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});

export type TGetAssetByWorkspace = z.infer<typeof ZGetAssetByWorkspace>;

export const ZGetAssetByWorkOrder = z.object({
  work_order_id: z.string(),
});

export type TGetAssetByWorkOrder = z.infer<typeof ZGetAssetByWorkOrder>;

export const ZSearchAssetSchema = z.object({
  search: z.string(),
});

export type TSearchAssetSchema = z.infer<typeof ZSearchAssetSchema>;

export const ZAssetCreateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  location_id: z.string().nullable(),
  workspace_id: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  id: z.string().optional(),
  public_id: z.string().optional(),
});

export type TAssetCreateSchema = z.infer<typeof ZAssetCreateSchema>;

export const ZAssetUpdateSchema = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    location_id: z.string().nullable(),
    workspace_id: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    id: z.string().optional(),
    public_id: z.string().optional(),
  })
  .merge(
    z.object({
      asset_id: z.string(),
    })
  );

export type TAssetUpdateSchema = z.infer<typeof ZAssetUpdateSchema>;

export const ZAssetDeleteSchema = z.object({
  assets: z.array(
    z.object({
      asset_id: z.string(),
    })
  ),
});

export type TAssetDeleteSchema = z.infer<typeof ZAssetDeleteSchema>;
