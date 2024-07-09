import {
  work_plan_templateModel,
  work_orderModel,
  work_stepModel,
  assetModel,
} from "@/prisma/zod";
import * as z from "zod";

export const ZCreateWorkOrderSchema = z
  .object({
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
    team_id: z.string({
      invalid_type_error: "Team ID must be a string",
      required_error: "Team ID is required",
    }),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      })
      .min(3, { message: "Description must be at least 3 characters long" })
      .max(1000, {
        message: "Description must be less than 1000 characters long",
      })
      .optional(),
    work_plan_template_id: z.string(),
  })
  .strict();

export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;

export const ZCreateWorkOrderWithTemplateSchema = work_orderModel
  .pick({
    name: true,
    description: true,
    team_id: true,
    company_id: true,
    location_id: true,
    source: true,
    type: true,
  })
  .merge(
    z.object({
      work_plan_template: work_plan_templateModel.pick({
        id: true,
      }),
    }),
  )
  .strict();

export type TCreateWorkOrderWithTemplateSchema = z.infer<
  typeof ZCreateWorkOrderWithTemplateSchema
>;

export const ZCreateWorkOrderWithStepsSchema = work_orderModel
  .pick({
    name: true,
    description: true,
    team_id: true,
    company_id: true,
    location_id: true,
    requested_by_id: true,
    source: true,
    type: true,
  })
  .merge(
    z.object({
      work_step: z.array(
        work_stepModel.pick({
          name: true,
          description: true,
          parent_step_id: true,
          step_order: true,
        }),
      ),
    }),
  )
  .merge(
    z.object({
      asset: z
        .array(
          assetModel.pick({
            id: true,
          }),
        )
        .nullable(),
    }),
  );

export type TCreateWorkOrderWithStepsSchema = z.infer<
  typeof ZCreateWorkOrderWithStepsSchema
>;
