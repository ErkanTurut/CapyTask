import * as z from "zod";

export const ZAssetCreateSchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
});

export type TAssetCreateSchema = z.infer<typeof ZAssetCreateSchema>;
