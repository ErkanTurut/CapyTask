import "server-only";

import { createAssignedResourceMany } from "@gembuddy/supabase/resources";
import {
  createServiceAppointment,
  deleteServiceAppointments,
  getServiceAppointmentById,
  getServiceAppointmentByServiceResources,
  getServiceAppointmentByUser,
  getServiceAppointmentByWorkOrder,
  updateServiceAppointment,
} from "@gembuddy/supabase/resources/service_appointment";
import { protectedProcedure, router } from "../../trpc";
import {
  ZCreateServiceAppointmentSchema,
  ZCreateServiceAppointmentWithItemsSchema,
  ZDeleteServiceAppointmentSchema,
  ZGetServiceAppointmentByServiceResourcesSchema,
  ZGetServiceAppointmentByUserSchema,
  ZGetServiceAppointmentByWorkOrderSchema,
  ZGetServiceAppointmentSchema,
  ZUpdateServiceAppointmentSchema,
} from "./schema";

export const service_appointment = router({
  get: {
    byId: protectedProcedure
      .input(ZGetServiceAppointmentSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceAppointmentById({
          db: ctx.db,
          input,
        });
      }),
    byUser: protectedProcedure
      .input(ZGetServiceAppointmentByUserSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceAppointmentByUser({
          db: ctx.db,
          input,
        });
      }),
    byWorkOrder: protectedProcedure
      .input(ZGetServiceAppointmentByWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceAppointmentByWorkOrder({
          db: ctx.db,
          input,
        });
      }),
    byServiceResource: protectedProcedure
      .input(ZGetServiceAppointmentByServiceResourcesSchema)
      .query(async ({ ctx, input }) => {
        return await getServiceAppointmentByServiceResources({
          db: ctx.db,
          input,
        });
      }),
  },
  create: {
    one: protectedProcedure
      .input(ZCreateServiceAppointmentSchema)
      .mutation(async ({ ctx, input }) => {
        return await createServiceAppointment({
          db: ctx.db,
          input,
        });
      }),
    withItems: protectedProcedure
      .input(ZCreateServiceAppointmentWithItemsSchema)
      .mutation(async ({ ctx, input }) => {
        const { data: service_appointment } = await createServiceAppointment({
          db: ctx.db,
          input: ZCreateServiceAppointmentSchema.parse(input),
        });
        if (input.service_resources) {
          await createAssignedResourceMany({
            db: ctx.db,
            input: input.service_resources.service_resource_id.map(
              (service_resource_id) => ({
                service_appointment_id: service_appointment.id,
                service_resource_id,
              }),
            ),
          });
        }

        return { data: service_appointment };
      }),
  },

  delete: {
    many: protectedProcedure
      .input(ZDeleteServiceAppointmentSchema)
      .mutation(async ({ ctx, input }) => {
        return await deleteServiceAppointments({
          db: ctx.db,
          input,
        });
      }),
  },

  update: protectedProcedure
    .input(ZUpdateServiceAppointmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateServiceAppointment({
        db: ctx.db,
        input,
        id: input.service_appointment_id,
      });
    }),
});
