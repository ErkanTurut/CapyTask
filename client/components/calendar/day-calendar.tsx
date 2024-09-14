"use calendar";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, addHours, startOfDay } from "date-fns";
import { DayCalendarProps, ColorClasses, Event } from "./types";
import {
  formatHour,
  formatEventTime,
  isTimeDisabled,
  getEventsForDay,
} from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formatDateRange } from "little-date";
import { colorClasses } from "./utils";

const DayCalendar: React.FC<DayCalendarProps> = ({
  events,
  initialTimeFormat = "12h",
  disabledTimeRanges = [],
  disabledSlots = [],
  date,
  onEventClick,
  onSlotClick,
}) => {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const handleSlotClick = (slotDate: Date) => {
    if (isTimeDisabled(slotDate, disabledTimeRanges, disabledSlots)) {
      console.log("This time slot is disabled");
      return;
    }

    const endDate = addHours(slotDate, 1);
    onSlotClick?.(slotDate);
    console.log(
      `Selected time range: ${format(slotDate, "PPpp")} - ${format(endDate, "PPpp")}`,
    );
  };

  const renderEvent = (event: Event, laneIndex: number, totalLanes: number) => {
    const startHour = event.start.getHours();
    const startMinutes = event.start.getMinutes();
    const endHour = event.end.getHours();
    const endMinutes = event.end.getMinutes();

    const startInHours = startHour + startMinutes / 60;
    const endInHours = endHour + endMinutes / 60;
    const durationInHours = Math.max(0.5, endInHours - startInHours);

    const laneWidth = 100 / totalLanes;
    const style = {
      top: `${startInHours * 3}rem`,
      height: `${durationInHours * 3}rem`,
      left: `${laneIndex * laneWidth}%`,
      width: `${laneWidth}%`,
    };

    return (
      <div
        key={event.id}
        className={`absolute flex flex-col overflow-hidden rounded-sm p-1 text-xs leading-4 ${
          colorClasses[event.color]
        }`}
        style={style}
      >
        <div
          className="z-10 hover:cursor-pointer"
          onClick={() => onEventClick?.(event)}
        >
          <p className="truncate font-semibold">{event.title}</p>
          {event.description && (
            <p className={`truncate text-${event.color}-500`}>
              {event.description}
            </p>
          )}
          <p className={`truncate text-${event.color}-500`}>
            <time dateTime={event.start.toISOString()}>
              {formatEventTime(event.start, initialTimeFormat)}
            </time>
            {" - "}
            <time dateTime={event.end.toISOString()}>
              {formatEventTime(event.end, initialTimeFormat)}
            </time>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-10 border-r p-1"></TableHead>
          <TableHead className="sticky top-0 p-1 text-center text-xs font-semibold">
            {format(date, "EEEE, MMMM d")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((hour) => (
          <TableRow key={hour} className="h-12 hover:bg-transparent">
            <TableCell className="relative w-11 border-r p-1 text-right">
              <span className="absolute -top-4 right-1 font-mono text-xs leading-5">
                {formatHour(hour, date, initialTimeFormat)}
              </span>
            </TableCell>
            <TableCell className="relative p-0">
              {hour === 0 &&
                getEventsForDay(date, events).map((event, index) =>
                  renderEvent(
                    event,
                    index,
                    getEventsForDay(date, events).length,
                  ),
                )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className={`absolute inset-0 h-full w-full rounded-none ${
                        isTimeDisabled(
                          addHours(startOfDay(date), hour),
                          disabledTimeRanges,
                          disabledSlots,
                        )
                          ? "bg-border hover:cursor-not-allowed"
                          : "transition-shadow duration-700 hover:shadow-inner"
                      }`}
                      onClick={() =>
                        handleSlotClick(addHours(startOfDay(date), hour))
                      }
                      disabled={isTimeDisabled(
                        addHours(startOfDay(date), hour),
                        disabledTimeRanges,
                        disabledSlots,
                      )}
                      aria-label={`Select time slot ${formatHour(hour, date, initialTimeFormat)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    align="start"
                    className="bg-secondary text-foreground"
                  >
                    {formatDateRange(
                      addHours(startOfDay(date), hour),
                      addHours(startOfDay(date), hour + 1),
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DayCalendar;
