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
