import z from "zod";

export const ZGetServiceAppointmentSchema = z.object({
  id: z.string(),
});

export type TGetServiceAppointmentSchema = z.infer<
  typeof ZGetServiceAppointmentSchema
>;

export const ZGetServiceAppointmentByUserSchema = z.object({
  user_id: z.string(),
});

export type TGetServiceAppointmentByUserSchema = z.infer<
  typeof ZGetServiceAppointmentByUserSchema
>;

export const ZGetServiceAppointmentByWorkOrderSchema = z.object({
  work_order_id: z.string(),
});

export type TGetServiceAppointmentByWorkOrderSchema = z.infer<
  typeof ZGetServiceAppointmentByWorkOrderSchema
>;

export const ZGetServiceAppointmentByServiceResourcesSchema = z.object({
  service_resource_id: z.string().array(),
  date_range: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

export type TGetServiceAppointmentByServiceResourcesSchema = z.infer<
  typeof ZGetServiceAppointmentByServiceResourcesSchema
>;

export const ZCreateServiceAppointmentSchema = z.object({
  created_at: z.string().optional(),
  end_date: z.string(),
  id: z.string().optional(),
  start_date: z.string(),
  updated_at: z.string().optional(),
  work_order_id: z.string().nullable().optional(),
  work_order_item_id: z.string().nullable().optional(),
});

export type TCreateServiceAppointmentSchema = z.infer<
  typeof ZCreateServiceAppointmentSchema
>;

export const ZCreateServiceAppointmentWithItemsSchema =
  ZCreateServiceAppointmentSchema.extend({
    service_resources: z
      .object({
        service_resource_id: z.string().array(),
      })
      .optional(),
    location_id: z.string().optional(),
  });

export type TCreateServiceAppointmentWithItemsSchema = z.infer<
  typeof ZCreateServiceAppointmentWithItemsSchema
>;

export const ZUpdateServiceAppointmentSchema = z
  .object({
    created_at: z.string().optional(),
    end_date: z.string().optional(),
    id: z.string().optional(),
    start_date: z.string().optional(),
    updated_at: z.string().optional(),
    work_order_id: z.string().optional(),
    work_order_item_id: z.string().optional(),
  })
  .merge(
    z.object({
      service_appointment_id: z.string(),
    }),
  );

export type TUpdateServiceAppointmentSchema = z.infer<
  typeof ZUpdateServiceAppointmentSchema
>;

export const ZDeleteServiceAppointmentSchema = z.object({
  service_appointment_id: z.string().array(),
});

export type TDeleteServiceAppointmentSchema = z.infer<
  typeof ZDeleteServiceAppointmentSchema
>;
