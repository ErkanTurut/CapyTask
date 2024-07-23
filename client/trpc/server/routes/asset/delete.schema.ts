import * as z from "zod";
export const ZAssetDeleteSchema = z.object({
  team_id: z.string(),
  asset_id: z.string().array(),
});
export type TAssetDeleteSchema = z.infer<typeof ZAssetDeleteSchema>;
