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
  date_range: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  location_id: z.string(),
  work_order_item_id: z.string().nullish(),
  service_resource: z.string().array().optional(),
});

export type TCreateServiceAppointmentSchema = z.infer<
  typeof createServiceAppointmentSchema
>;
