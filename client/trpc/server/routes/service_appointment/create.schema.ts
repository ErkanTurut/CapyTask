import { z } from "zod";
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
  // start_date: z.string(),
  // end_date: z.string(),
  work_order_item_id: z.string().nullish(),
  assigned_resource: z.array(assignedResourceSchema).optional(),
});

export type TCreateServiceAppointmentSchema = z.infer<
  typeof createServiceAppointmentSchema
>;
