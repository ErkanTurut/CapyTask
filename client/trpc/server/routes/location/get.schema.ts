import { LocationType } from "@prisma/client";
import * as z from "zod";

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
