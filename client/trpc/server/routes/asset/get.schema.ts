import { LocationType, Status } from "@prisma/client";
import * as z from "zod";
import locationSchema, {
  locationWithRelations,
  locationWithRelationsSchema,
  ZLocationQuerySchema,
} from "../location/get.schema";
import { ZWorkStepQuerySchema } from "../work_step/get.schema";
import { Database } from "@/types/supabase.types";

export const ZGetAssetSchema = z.object({
  id: z.string(),
});

export type TGetAssetSchema = z.infer<typeof ZGetAssetSchema>;

export const ZSearchAssetSchema = z.object({
  query: z.string(),
});

export interface TSearchAssetSchema
  extends z.infer<typeof ZSearchAssetSchema> {}

type Output = Database["public"]["Tables"]["asset"]["Row"];
type Input = Database["public"]["Tables"]["asset"]["Insert"];

export const ZAssetQuerySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
  location: ZLocationQuerySchema.nullish(),
});

export const assetSchema = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
});

export type assetRelations = {
  location?: locationWithRelations | null;
  // workspace: workspaceWithRelations;
  // work_order_asset: work_order_assetWithRelations[];
  // work_step: work_stepWithRelations[];
};

export type assetWithRelations = z.infer<typeof assetSchema> & assetRelations;

export const assetWithRelationsSchema: z.ZodType<assetWithRelations> =
  assetSchema.merge(
    z.object({
      location: z.lazy(() => locationWithRelationsSchema).nullish(),
      // workspace: z.lazy(() => workspaceWithRelationsSchema),
      // work_order_asset: z.lazy(() => work_order_assetWithRelationsSchema).array(),
      // work_step: z.lazy(() => work_stepWithRelationsSchema).array(),
    }),
  );
