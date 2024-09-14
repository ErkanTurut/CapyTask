import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  format,
  isSameDay,
  startOfDay,
  addMinutes,
  isWithinInterval,
  isBefore,
} from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color: "blue" | "pink" | "indigo";
}

interface DayCalendarProps {
  events: Event[];
  initialTimeFormat?: "24h" | "12h";
  disabledTimeRanges?: { start: Date; end: Date }[];
  disabledSlots?: Date[];
  date: Date;
}

const colorClasses = {
  blue: "bg-blue-50 hover:bg-blue-100 text-blue-700",
  pink: "bg-pink-50 hover:bg-pink-100 text-pink-700",
  indigo: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700",
};

export default function DayCalendar({
  events,
  initialTimeFormat = "12h",
  disabledTimeRanges = [],
  disabledSlots = [],
  date,
}: DayCalendarProps) {
  const [timeFormat, setTimeFormat] = React.useState<"24h" | "12h">(
    initialTimeFormat,
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventStyle = (event: Event) => {
    const startMinutes = event.start.getHours() * 60 + event.start.getMinutes();
    const endMinutes = event.end.getHours() * 60 + event.end.getMinutes();

    const startRow = Math.floor(startMinutes / 30); // Changed from +1 to no offset
    const endRow = Math.ceil(endMinutes / 30); // Changed from +1 to no offset
    const duration = endRow - startRow;

    return {
      gridRowStart: startRow + 1, // Adjusted to match grid row indexing
      gridRowEnd: `span ${duration}`,
    };
  };

  const formatHour = (hour: number, minute: number) => {
    const time = addMinutes(startOfDay(date), hour * 60 + minute);
    return format(time, timeFormat === "24h" ? "HH:mm" : "h:mm a");
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
          slotDate.getHours() === disabledSlot.getHours() &&
          slotDate.getMinutes() === disabledSlot.getMinutes(),
      )
    );
  };

  const handleSlotClick = (slotDate: Date) => {
    if (isTimeDisabled(slotDate)) {
      console.log("This time slot is disabled");
      return;
    }

    const endDate = addMinutes(slotDate, 30);
    console.log(
      `Selected time range: ${format(slotDate, "PPpp")} - ${format(endDate, "PPpp")}`,
    );
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow">
        <div className="flex flex-auto flex-col overflow-auto">
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none border-r"></div>
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div className="row-end-1 h-7"></div>
                {hours.map((hour) => (
                  <React.Fragment key={hour}>
                    <div>
                      <div className="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5">
                        {formatHour(hour, 0)}
                      </div>
                    </div>
                    <div>
                      <div className="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-muted-foreground">
                        {formatHour(hour, 30)}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Events and clickable slots */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows:
                    "1.75rem repeat(48, minmax(3.5rem, 1fr)) auto",
                }}
              >
                {hours.map((hour) => (
                  <React.Fragment key={hour}>
                    {[0, 30].map((minute) => {
                      const slotDate = addMinutes(
                        startOfDay(date),
                        hour * 60 + minute,
                      );
                      return (
                        <li
                          key={`${hour}-${minute}`}
                          className="relative"
                          style={{ gridRow: `span 1` }}
                        >
                          <button
                            type="button"
                            className={`absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                              isTimeDisabled(slotDate)
                                ? "bg-muted hover:cursor-not-allowed"
                                : "hover:bg-accent"
                            }`}
                            onClick={() => handleSlotClick(slotDate)}
                            disabled={isTimeDisabled(slotDate)}
                            aria-label={`Select time slot ${formatHour(hour, minute)}`}
                          />
                        </li>
                      );
                    })}
                  </React.Fragment>
                ))}
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="relative"
                    style={getEventStyle(event)}
                  >
                    <a
                      href="#"
                      className={`group absolute inset-0 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 ${
                        colorClasses[event.color]
                      }`}
                    >
                      <p className="order-1 font-semibold">{event.title}</p>
                      {event.description && (
                        <p
                          className={`order-1 group-hover:text-${event.color}-700 text-${event.color}-500`}
                        >
                          {event.description}
                        </p>
                      )}
                      <p
                        className={`group-hover:text-${event.color}-700 text-${event.color}-500`}
                      >
                        <time dateTime={event.start.toISOString()}>
                          {formatEventTime(event.start)}
                        </time>
                      </p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
