import z from "zod";

export const ZGetCompanyByIdSchema = z.object({
  id: z.string(),
});

export type TGetCompanyByIdSchema = z.infer<typeof ZGetCompanyByIdSchema>;

export const ZSearchCompanySchema = z.object({
  search: z.string(),
});

export type TSearchCompanySchema = z.infer<typeof ZSearchCompanySchema>;

export const ZCompanyCreateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  workspace_id: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  id: z.string().optional(),
  public_id: z.string().optional(),
});

export type TCompanyCreateSchema = z.infer<typeof ZCompanyCreateSchema>;

export const ZUpdateCompanySchema = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    workspace_id: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    id: z.string().optional(),
    public_id: z.string().optional(),
  })
  .merge(
    z.object({
      company_id: z.string(),
    }),
  );

export type TUpdateCompanySchema = z.infer<typeof ZUpdateCompanySchema>;

export const ZGetCompanyByWorkspaceSchema = z.object({
  url_key: z.string(),
  range: z.object({
    from: z.number().int().nonnegative(),
    to: z.number().int().positive(),
  }),
});

export type TGetCompanyByWorkspaceSchema = z.infer<
  typeof ZGetCompanyByWorkspaceSchema
>;
