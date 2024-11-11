import z from "zod";

export const ZCreateWorkspaceSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  image_uri: z.string().nullable().optional(),
  name: z.string(),
  public_id: z.string().optional(),
  updated_at: z.string().optional(),
  url_key: z.string(),
});

export type TCreateWorkspaceSchema = z.infer<typeof ZCreateWorkspaceSchema>;

export const ZUpdateWorkspaceSchema = z
  .object({
    created_at: z.string().optional(),
    created_by: z.string().optional(),
    description: z.string().nullable().optional(),
    id: z.string().optional(),
    image_uri: z.string().nullable().optional(),
    name: z.string().optional(),
    public_id: z.string().optional(),
    updated_at: z.string().optional(),
    url_key: z.string().optional(),
  })
  .merge(
    z.object({
      workspace_id: z.string(),
    }),
  );

export type TUpdateWorkspaceSchema = z.infer<typeof ZUpdateWorkspaceSchema>;

export const ZGetWorkspaceByIdSchema = z.object({
  id: z.string(),
});

export type TGetWorkspaceByIdSchema = z.infer<typeof ZGetWorkspaceByIdSchema>;

export const ZGetWorkspacesByUserSchema = z.object({
  user_id: z.string(),
});

export type TGetWorkspacesByUserSchema = z.infer<
  typeof ZGetWorkspacesByUserSchema
>;

export const ZGetWorkspaceByUrlKeySchema = z.object({
  url_key: z.string(),
});

export type TGetWorkspaceByUrlKeySchema = z.infer<
  typeof ZGetWorkspaceByUrlKeySchema
>;

export const ZDeleteWorkspaceManySchema = z.object({
  workspace_id: z.string().array(),
});

export type TDeleteWorkspaceManySchema = z.infer<
  typeof ZDeleteWorkspaceManySchema
>;
