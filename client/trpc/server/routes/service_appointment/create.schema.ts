import { z } from "zod";
import { service_resource } from "../service_resource/_router";
export const assignedResourceSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  service_resource_id: z.string(),
  service_appointment_id: z.string(),
});

export const createServiceAppointmentSchema = z.object({
  work_order_id: z.string(),
  team_id: z.string(),
  workspace_id: z.string(),
  date_range: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),

  work_order_item_id: z.string().nullish(),
  service_resource: z
    .object({
      id: z.string(),
    })
    .array()
    .optional(),
});

export type TCreateServiceAppointmentSchema = z.infer<
  typeof createServiceAppointmentSchema
>;
