import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const service_appointment = router({
  test: protectedProcedure
    .input(
      z.object({
        scheduled_range: z.object({
          from: z.string(),
          to: z.string(),
        }),
      }),
    )
    .query(async ({ ctx: { db }, input }) => {
      const { data: service_resources } = await db
        .from("service_resource")
        .select("*, service_appointment(*)")
        .gte("service_appointment.start_date", input.scheduled_range.from)
        .lte("service_appointment.end_date", input.scheduled_range.to);

      if (service_resources === null) {
        return [];
      }
      return getAvailableTimeSlots({
        scheduleRange: input.scheduled_range,
        unavailableTimeSlots: service_resources.map((resource) => ({
          id: resource.id,
          time_slots: (resource.service_appointment || []).map(
            (appointment) => ({
              from: appointment.start_date,
              to: appointment.end_date,
            }),
          ),
        })),
      });
    }),
});

type TimeSlot = { from: string; to: string };
type ServiceResource = { id: string; time_slots: TimeSlot[] };

function getAvailableTimeSlots({
  scheduleRange,
  unavailableTimeSlots,
}: {
  scheduleRange: TimeSlot;
  unavailableTimeSlots: ServiceResource[];
}) {
  return unavailableTimeSlots.map((resource) => {
    const availableSlots = removeOverlaps({
      scheduleRange: scheduleRange,
      unavailableSlots: resource.time_slots,
    });
    return {
      id: resource.id.toString(),
      available_time_slots: availableSlots,
    };
  });
}

function removeOverlaps({
  scheduleRange,
  unavailableSlots,
}: {
  scheduleRange: TimeSlot;
  unavailableSlots: TimeSlot[];
}): TimeSlot[] {
  const sortedSlots = unavailableSlots.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );
  const availableSlots: TimeSlot[] = [];
  let currentFrom = new Date(scheduleRange.from);
  const scheduleEnd = new Date(scheduleRange.to);

  sortedSlots.forEach((slot) => {
    const slotFrom = new Date(slot.from);
    const slotTo = new Date(slot.to);

    if (currentFrom < slotFrom) {
      availableSlots.push({
        from: currentFrom.toISOString(),
        to: slotFrom.toISOString(),
      });
    }
    currentFrom = slotTo > currentFrom ? slotTo : currentFrom;
  });

  if (currentFrom < scheduleEnd) {
    availableSlots.push({
      from: currentFrom.toISOString(),
      to: scheduleEnd.toISOString(),
    });
  }

  return availableSlots;
}
