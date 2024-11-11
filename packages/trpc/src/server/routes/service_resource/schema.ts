import z from "zod";

export const ZGetServiceResourceByIdSchema = z.object({
  id: z.string(),
});

export type TGetServiceResourceByIdSchema = z.infer<
  typeof ZGetServiceResourceByIdSchema
>;

export const ZGetServiceResourceByUserSchema = z.object({
  user_id: z.string(),
});

export type TGetServiceResourceByUserSchema = z.infer<
  typeof ZGetServiceResourceByUserSchema
>;

export const ZGetServiceResourceRecommendationSchema = z.object({
  team_identity: z.string(),
  date_range: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

export type TGetServiceResourceRecommendationSchema = z.infer<
  typeof ZGetServiceResourceRecommendationSchema
>;

export const ZSearchServiceResourceSchema = z.object({
  search: z.string(),
});

export type TSearchServiceResourceSchema = z.infer<
  typeof ZSearchServiceResourceSchema
>;

export const ZUpdateServiceResourceSchema = z
  .object({
    created_at: z.string().optional(),
    first_name: z.string().optional(),
    full_name: z.unknown().nullable().optional(),
    id: z.string().optional(),
    is_active: z.boolean().optional(),
    last_name: z.string().optional(),
    team_id: z.string().optional(),
    updated_at: z.string().optional(),
    user_id: z.string().optional(),
  })
  .merge(
    z.object({
      service_resource_id: z.string(),
    }),
  );

export type TUpdateServiceResourceSchema = z.infer<
  typeof ZUpdateServiceResourceSchema
>;

export const ZCreateServiceResourceSchema = z.object({
  created_at: z.string().optional(),
  first_name: z.string(),
  full_name: z.unknown().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_name: z.string(),
  team_id: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export type TCreateServiceResourceSchema = z.infer<
  typeof ZCreateServiceResourceSchema
>;
