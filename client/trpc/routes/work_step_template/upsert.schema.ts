import * as z from "zod";
export const ZUpsertWorkStepTemplateSchema = z
  .object({
    id: z.string(),
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(100, { message: "Name must be less than 100 characters long" })
      .regex(/^[a-zA-Z0-9 ]+$/, {
        message: "Name must contain only letters, numbers and spaces",
      }),
    description: z
      .string()
      .max(500, {
        message: "Description must be less than 500 characters long",
      })
      .nullable(),
    step_order: z.number().nullable(),
    work_plan_template_id: z.string(),
    parent_step_id: z.string().nullable(),

    created_at: z.string(),
    updated_at: z.string(),
    created_by_id: z.string().nullable(),
  })
  .array();
export type TUpsertWorkStepTemplateSchema = z.infer<
  typeof ZUpsertWorkStepTemplateSchema
>;
