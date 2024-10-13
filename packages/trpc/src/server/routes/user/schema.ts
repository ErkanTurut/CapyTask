import z from "zod";

export const ZCreateUserSchema = z.object({
  createdAt: z.string().optional(),
  email: z.string(),
  external_id: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  full_name: z.unknown().nullable().optional(),
  id: z.string().optional(),
  image_uri: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
});

export type TCreateUserSchema = z.infer<typeof ZCreateUserSchema>;

export const ZUpdateUserSchema = z
  .object({
    createdAt: z.string().optional(),
    email: z.string().optional(),
    external_id: z.string().nullable().optional(),
    first_name: z.string().nullable().optional(),
    full_name: z.unknown().nullable().optional(),
    id: z.string().optional(),
    image_uri: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    updatedAt: z.string().optional(),
  })
  .merge(
    z.object({
      user_id: z.string(),
    })
  );

export type TUpdateUserSchema = z.infer<typeof ZUpdateUserSchema>;

export const ZGetUserByIdSchema = z.object({
  id: z.string(),
});

export type TGetUserByIdSchema = z.infer<typeof ZGetUserByIdSchema>;
