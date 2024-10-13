import "server-only";

import { protectedProcedure, router } from "../../trpc";
import {
  getServiceAppointmentByWorkOrder,
  createServiceAppointment,
  deleteServiceAppointments,
  getServiceAppointmentById,
  getServiceAppointmentByServiceResources,
  updateServiceAppointment,
} from "@gembuddy/supabase/resources/service_appointment";
import {
  ZCreateServiceAppointmentSchema,
  ZDeleteServiceAppointmentSchema,
  ZGetServiceAppointmentByServiceResourcesSchema,
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
  create: protectedProcedure
    .input(ZCreateServiceAppointmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await createServiceAppointment({ db: ctx.db, input });
    }),

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
