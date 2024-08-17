import { LocationType } from "@prisma/client";
import * as z from "zod";
import {
  assetWithRelations,
  assetWithRelationsSchema,
} from "../asset/get.schema";

export const ZGetLocationSchema = z
  .object({
    id: z.string(),
    range: z.object({
      start: z.number().int().nonnegative(),
      end: z.number().int().positive(),
    }),
    q: z.string(),
    work_order_id: z.string(),
    url_key: z.string(),
  })
  .strict();

export type TGetLocationSchema = z.infer<typeof ZGetLocationSchema>;

export const ZLocationQuerySchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
  location_type: z.nativeEnum(LocationType),
  location_level: z.number().int(),
  parent_location_id: z.string().nullish(),
  workspace_id: z.string(),
  address_id: z.string(),
  company_id: z.string().nullish(),
});

// /////////////////////////////////////////
// // LOCATION SCHEMA
// /////////////////////////////////////////

export const locationSchema = z.object({
  location_type: z.nativeEnum(LocationType),
  id: z.string(),
  public_id: z.string(),
  location_level: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  parent_location_id: z.string().nullish(),
  workspace_id: z.string(),
  address_id: z.string(),
  company_id: z.string().nullish(),
});

export type location = z.infer<typeof locationSchema>;

export type locationRelations = {
  asset: assetWithRelations[];
  // address: addressWithRelations;
  // company?: companyWithRelations | null;
  // parent_location?: locationWithRelations | null;
  // sub_locations: locationWithRelations[];
  // workspace: workspaceWithRelations;
  // work_order: work_orderWithRelations[];
};

export type locationWithRelations = z.infer<typeof locationSchema> &
  locationRelations;

export const locationWithRelationsSchema: z.ZodType<locationWithRelations> =
  locationSchema.merge(
    z.object({
      asset: z.lazy(() => assetWithRelationsSchema).array(),
      // address: z.lazy(() => addressWithRelationsSchema),
      // company: z.lazy(() => companyWithRelationsSchema).nullish(),
      // parent_location: z.lazy(() => locationWithRelationsSchema).nullish(),
      // sub_locations: z.lazy(() => locationWithRelationsSchema).array(),
      // workspace: z.lazy(() => workspaceWithRelationsSchema),
      // work_order: z.lazy(() => work_orderWithRelationsSchema).array(),
    }),
  );

export default locationSchema;
