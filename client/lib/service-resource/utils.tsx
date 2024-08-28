import { Database } from "@/types/supabase.types";

type TimeSlot = { from: string; to: string };

export function removeOverlaps({
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

/**
 * Generate intervals of time with a given duration from a given time range
 * @param {TimeSlot} scheduleRange - The overall schedule range
 * @param {number} duration - The duration of each time slot in minutes
 * @returns {TimeSlot[]} An array of generated time slots
 */
export function generateTimeSlots({
  scheduleRange,
  duration,
}: {
  scheduleRange: TimeSlot;
  duration: number;
}): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];
  const scheduleStart = new Date(scheduleRange.from);
  const scheduleEnd = new Date(scheduleRange.to);
  const durationMs = duration * 60000;

  for (
    let currentTime = scheduleStart;
    currentTime < scheduleEnd;
    currentTime = new Date(currentTime.getTime() + durationMs)
  ) {
    timeSlots.push({
      from: currentTime.toISOString(),
      to: new Date(
        Math.min(currentTime.getTime() + durationMs, scheduleEnd.getTime()),
      ).toISOString(),
    });
  }

  return timeSlots;
}

/**
 * Group time slots by day
 * @param {TimeSlot[]} timeSlots - Array of time slots to group
 * @returns {Record<string, TimeSlot[]>} Object with dates as keys and arrays of time slots as values
 */
export function groupTimeSlotsByDay(
  timeSlots: TimeSlot[],
): Record<string, TimeSlot[]> {
  return timeSlots.reduce(
    (grouped, slot) => {
      const slotDate = new Date(slot.from).toISOString().split("T")[0];
      (grouped[slotDate] = grouped[slotDate] || []).push(slot);
      return grouped;
    },
    {} as Record<string, TimeSlot[]>,
  );
}
