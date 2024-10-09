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

export const ZCompanyUpdateSchema = z
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
    })
  );

export type TCompanyUpdateSchema = z.infer<typeof ZCompanyUpdateSchema>;
