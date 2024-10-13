import z from "zod";

export const ZCreateTeamSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  identity: z.string(),
  image_uri: z.string().nullable().optional(),
  name: z.string(),
  public_id: z.string().optional(),
  updated_at: z.string().optional(),
  workspace_id: z.string(),
});

export type TCreateTeamSchema = z.infer<typeof ZCreateTeamSchema>;

export const ZGetTeamByIdSchema = z.object({
  id: z.string(),
});

export type TGetTeamByIdSchema = z.infer<typeof ZGetTeamByIdSchema>;

export const ZGetTeamByWorkspaceSchema = z.object({
  workspace_id: z.string(),
});

export type TGetTeamByWorkspaceSchema = z.infer<
  typeof ZGetTeamByWorkspaceSchema
>;

export const ZGetTeamByTeamIdentitySchema = z.object({
  identity: z.string(),
});

export const ZGetTeamByUrlKeySchema = z.object({
  url_key: z.string(),
});

export type TGetTeamByUrlKeySchema = z.infer<typeof ZGetTeamByUrlKeySchema>;

export const ZUpdateTeamSchema = z
  .object({
    created_at: z.string().optional(),
    description: z.string().optional(),
    id: z.string().optional(),
    identity: z.string().optional(),
    image_uri: z.string().optional(),
    name: z.string().optional(),
    public_id: z.string().optional(),
    updated_at: z.string().optional(),
    workspace_id: z.string().optional(),
  })
  .merge(
    z.object({
      team_id: z.string(),
    })
  );

export type TUpdateTeamSchema = z.infer<typeof ZUpdateTeamSchema>;
