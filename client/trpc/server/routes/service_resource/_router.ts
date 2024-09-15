import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { findAvailableRanges } from "@/lib/service-appointment/utils";

export const service_resource = router({
  get: {
    recommendation: protectedProcedure
      .input(
        z.object({
          team_identity: z.string(),
          from: z.string().datetime(),
          to: z.string().datetime(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        const { data, error } = await db
          .from("service_resource")
          .select(
            "*,team!inner(identity), assigned_resource(service_appointment!inner(*))",
          )
          .eq("team.identity", input.team_identity)
          .gte("assigned_resource.service_appointment.start_date", input.from)
          .lte("assigned_resource.service_appointment.end_date", input.to);
        if (error) {
          throw error;
        }
        // return data;

        const result = data.map((resource) => {
          const appointments = resource.assigned_resource.map(
            (assigned) => assigned.service_appointment,
          );
          return {
            ...resource,
            availableRanges: findAvailableRanges({
              scheduleRange: { from: input.from, to: input.to },
              unavailableSlots: appointments.map((appointment) => ({
                from: appointment.start_date,
                to: appointment.end_date,
              })),
            }),
          };
        });

        return result;
      }),
    textSearch: protectedProcedure
      .input(
        z.object({
          search: z.string(),
        }),
      )
      .query(async ({ ctx: { db }, input }) => {
        // transform space to %
        const search = input.search.replace(/ /g, "%");

        const { data, error } = await db
          .from("service_resource")
          .select("*, assigned_resource(service_appointment(*))")
          .textSearch("full_name", search);

        const { data: embedding, error: embeddingError } =
          await db.functions.invoke("embed", {
            body: JSON.stringify({ input: input.search }),
          });

        if (error) {
          throw error;
        }

        return data;
      }),
  },
});
