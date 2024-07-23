import * as z from "zod";
import {
  Completelocation,
  RelatedlocationModel,
  Completeworkspace,
  RelatedworkspaceModel,
  Completework_order_asset,
  Relatedwork_order_assetModel,
} from "./index";

export const assetModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
});

export interface Completeasset extends z.infer<typeof assetModel> {
  location?: Completelocation | null;
  workspace: Completeworkspace;
  work_order_asset: Completework_order_asset[];
}

/**
 * RelatedassetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedassetModel: z.ZodSchema<Completeasset> = z.lazy(() =>
  assetModel.extend({
    location: RelatedlocationModel.nullish(),
    workspace: RelatedworkspaceModel,
    work_order_asset: Relatedwork_order_assetModel.array(),
  }),
);
