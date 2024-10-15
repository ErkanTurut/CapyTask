import { Shift, TimeSlot } from "./types";

import {
  getISODay,
  parse,
  setHours,
  setMinutes,
  isWithinInterval,
  startOfDay,
  endOfDay,
  addDays,
} from "date-fns";

export function findAvailableRanges({
  scheduleRange,
  unavailableSlots,
}: {
  scheduleRange: TimeSlot;
  unavailableSlots: TimeSlot[];
}): TimeSlot[] {
  const sortedSlots = unavailableSlots.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );
  const availableRanges: TimeSlot[] = [];
  let currentFrom = new Date(scheduleRange.from);
  const scheduleEnd = new Date(scheduleRange.to);

  sortedSlots.forEach((slot) => {
    const slotFrom = new Date(slot.from);
    const slotTo = new Date(slot.to);

    if (currentFrom < slotFrom) {
      availableRanges.push({
        from: currentFrom.toISOString(),
        to: slotFrom.toISOString(),
      });
    }
    currentFrom = slotTo > currentFrom ? slotTo : currentFrom;
  });

  if (currentFrom < scheduleEnd) {
    availableRanges.push({
      from: currentFrom.toISOString(),
      to: scheduleEnd.toISOString(),
    });
  }

  return availableRanges;
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
      (grouped[slotDate!] = grouped[slotDate!] || []).push(slot);
      return grouped;
    },
    {} as Record<string, TimeSlot[]>,
  );
}

export function getWorkShiftsFromDateRange(
  startDate: Date,
  endDate: Date,
  shift: Shift,
): { date: Date; start: Date; end: Date }[] {
  const workShifts: { date: Date; start: Date; end: Date }[] = [];
  let currentDate = startOfDay(startDate);
  const rangeEnd = endOfDay(endDate);

  const shiftStart = parse(shift.start_time, "HH:mm", new Date());
  const shiftEnd = parse(shift.end_time, "HH:mm", new Date());

  while (currentDate <= rangeEnd) {
    const dayOfWeek = getISODay(currentDate);
    if (shift.days.includes(dayOfWeek)) {
      const currentShiftStart = setMinutes(
        setHours(currentDate, shiftStart.getHours()),
        shiftStart.getMinutes(),
      );
      const currentShiftEnd = setMinutes(
        setHours(currentDate, shiftEnd.getHours()),
        shiftEnd.getMinutes(),
      );

      workShifts.push({
        date: currentDate,
        start: currentShiftStart,
        end: currentShiftEnd,
      });
    }
    currentDate = addDays(currentDate, 1);
  }

  return workShifts;
}
