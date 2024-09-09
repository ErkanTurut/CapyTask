import {
  format,
  addHours,
  startOfDay,
  isWithinInterval,
  isSameDay,
  areIntervalsOverlapping,
} from "date-fns";
import { Event } from "./types";

export const formatHour = (
  hour: number,
  startDate: Date,
  timeFormat: "24h" | "12h",
) => {
  const time = addHours(startOfDay(startDate), hour);
  return format(time, timeFormat === "24h" ? "HH:mm" : "h a");
};

export const formatEventTime = (eventDate: Date, timeFormat: "24h" | "12h") => {
  return format(eventDate, timeFormat === "24h" ? "HH:mm" : "h:mm a");
};

export const isTimeDisabled = (
  slotDate: Date,
  disabledTimeRanges: { start: Date; end: Date }[],
  disabledSlots: Date[],
) => {
  return (
    disabledTimeRanges.some((range) =>
      isWithinInterval(slotDate, { start: range.start, end: range.end }),
    ) ||
    disabledSlots.some(
      (disabledSlot) =>
        isSameDay(slotDate, disabledSlot) &&
        slotDate.getHours() === disabledSlot.getHours(),
    )
  );
};

export const getEventsForDay = (day: Date, events: Event[]) => {
  return events.filter((event) => isSameDay(day, event.start));
};

export const calculateEventOverlaps = (dayEvents: Event[]) => {
  const sortedEvents = dayEvents.sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
  const eventLanes: Event[][] = [];

  sortedEvents.forEach((event) => {
    let placed = false;

    for (let lane of eventLanes) {
      let overlapFound = false;

      for (let laneEvent of lane) {
        if (
          areIntervalsOverlapping(
            { start: laneEvent.start, end: laneEvent.end },
            { start: event.start, end: event.end },
            { inclusive: true },
          )
        ) {
          overlapFound = true;
          break;
        }
      }

      if (!overlapFound) {
        lane.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      eventLanes.push([event]);
    }
  });

  return eventLanes;
};
