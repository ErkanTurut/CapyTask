import * as z from "zod";
import {
  assetSchema,
  assetWithRelationsSchema,
  ZAssetQuerySchema,
} from "../asset/get.schema";
import { Status } from "@prisma/client";

export const ZGetWorkOrderSchema = z
  .object({
    id: z.string(),
    team_identity: z
      .string({
        invalid_type_error: "Indentity must be a string",
        required_error: "Indentity is required",
      })
      .min(3, { message: "Indentity must be at least 3 characters long" })
      .max(5, { message: "Slug must be less than 5 characters long" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Slug must be lowercase and contain no spaces",
      }),
    range: z.object({
      start: z.number().int().nonnegative(),
      end: z.number().int().positive(),
    }),
    q: z.string(),
  })
  .strict();

export type TGetWorkOrderSchema = z.infer<typeof ZGetWorkOrderSchema>;

export const ZWorkOrderAssetQuerySchema = z.object({
  status: z.nativeEnum(Status),
  work_order_id: z.string(),
  work_asset_id: z.string().optional(),
  asset: assetWithRelationsSchema.optional(),
});

export type TWorkOrderAssetQuerySchema = z.infer<
  typeof ZWorkOrderAssetQuerySchema
>;
