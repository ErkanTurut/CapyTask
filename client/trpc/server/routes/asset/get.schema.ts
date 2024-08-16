import { LocationType, Status } from "@prisma/client";
import * as z from "zod";
import { ZLocationQuerySchema } from "../location/get.schema";
import { ZWorkStepQuerySchema } from "../work_step/get.schema";

export const ZGetAssetSchema = z.object({
  id: z.string(),
});

export type TGetAssetSchema = z.infer<typeof ZGetAssetSchema>;

export const ZSearchAssetSchema = z.object({
  query: z.string(),
});

export interface TSearchAssetSchema
  extends z.infer<typeof ZSearchAssetSchema> {}

export const ZAssetQuerySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
  location: ZLocationQuerySchema.nullish(),
  work_step: ZWorkStepQuerySchema.array().nullish(),
});
