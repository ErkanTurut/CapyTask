import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
  startOfDay,
  addHours,
  isWithinInterval,
  differenceInHours,
} from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color: "blue" | "pink" | "indigo";
}

interface WeekCalendarProps {
  events: Event[];
  initialTimeFormat?: "24h" | "12h";
  disabledTimeRanges?: { start: Date; end: Date }[];
  disabledSlots?: Date[];
  startDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const colorClasses = {
  blue: "bg-blue-50 hover:bg-blue-100 text-blue-700",
  pink: "bg-pink-50 hover:bg-pink-100 text-pink-700",
  indigo: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700",
};

export default function WeekCalendar({
  events,
  initialTimeFormat = "12h",
  disabledTimeRanges = [],
  disabledSlots = [],
  startDate,
  weekStartsOn = 1,
}: WeekCalendarProps) {
  const [timeFormat, setTimeFormat] = React.useState<"24h" | "12h">(
    initialTimeFormat,
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(startDate, { weekStartsOn }), i),
  );

  const formatHour = (hour: number) => {
    const time = addHours(startOfDay(startDate), hour);
    return format(time, timeFormat === "24h" ? "HH:mm" : "h a");
  };

  const formatEventTime = (eventDate: Date) => {
    return format(eventDate, timeFormat === "24h" ? "HH:mm" : "h:mm a");
  };

  const isTimeDisabled = (slotDate: Date) => {
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

  const handleSlotClick = (slotDate: Date) => {
    if (isTimeDisabled(slotDate)) {
      console.log("This time slot is disabled");
      return;
    }

    const endDate = addHours(slotDate, 1);
    console.log(
      `Selected time range: ${format(slotDate, "PPpp")} - ${format(
        endDate,
        "PPpp",
      )}`,
    );
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(day, event.start));
  };

  const renderEvent = (event: Event, dayIndex: number) => {
    const startHour = event.start.getHours();
    const startMinutes = event.start.getMinutes();
    const endHour = event.end.getHours();
    const endMinutes = event.end.getMinutes();

    // Calculate the top position (start hour + fractional part of minutes)
    const startInHours = startHour + startMinutes / 60;

    // Calculate the duration (end hour + fractional part of minutes) - (start hour + fractional part of minutes)
    const endInHours = endHour + endMinutes / 60;
    const durationInHours = Math.max(0.5, endInHours - startInHours);

    // Update the style to reflect the proportional height and position
    const style = {
      top: `${startInHours * 3}rem`, // Each hour is 3rem tall, so multiply by 3
      height: `${durationInHours * 3}rem`, // Same here for duration
      left: "0.25rem",
      right: "0.25rem",
    };

    return (
      <div
        key={event.id}
        className={`absolute flex flex-col overflow-hidden rounded-sm p-1 text-xs leading-4 ${
          colorClasses[event.color]
        }`}
        style={style}
      >
        <p className="truncate font-semibold">{event.title}</p>
        {event.description && (
          <p className={`truncate text-${event.color}-500`}>
            {event.description}
          </p>
        )}
        <p className={`truncate text-${event.color}-500`}>
          <time dateTime={event.start.toISOString()}>
            {formatEventTime(event.start)}
          </time>
          {" - "}
          <time dateTime={event.end.toISOString()}>
            {formatEventTime(event.end)}
          </time>
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-10 border-r p-1"></th>
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  className="border-b border-r p-1 text-center text-xs font-semibold"
                >
                  {format(day, "EEE dd/MM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour} className="h-12">
                <td className="relative border-r p-1 text-right">
                  <span className="absolute -top-3 right-1 text-xs leading-5">
                    {formatHour(hour)}
                  </span>
                </td>
                {weekDays.map((day, dayIndex) => {
                  const slotDate = addHours(startOfDay(day), hour);
                  return (
                    <td
                      key={`${dayIndex}-${hour}`}
                      className="relative border-b border-r p-0"
                    >
                      <button
                        type="button"
                        className={`absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 ${
                          isTimeDisabled(slotDate)
                            ? "bg-muted hover:cursor-not-allowed"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleSlotClick(slotDate)}
                        disabled={isTimeDisabled(slotDate)}
                        aria-label={`Select time slot ${formatHour(hour)} on ${format(day, "EEEE")}`}
                      />
                      {hour === 0 &&
                        getEventsForDay(day).map((event) =>
                          renderEvent(event, dayIndex),
                        )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
