"use client";
import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  format,
  addDays,
  startOfWeek,
  startOfDay,
  addHours,
  isToday,
} from "date-fns";
import { Event } from "./types";
import {
  formatHour,
  formatEventTime,
  isTimeDisabled,
  getEventsForDay,
  calculateEventOverlaps,
} from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formatDateRange } from "little-date";
import { cn } from "@/lib/utils";

import { colorClasses } from "./utils";

export interface WeekCalendarProps {
  events: Event[];
  initialTimeFormat?: "24h" | "12h";
  disabled?: (date: Date) => boolean;
  startDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onEventClick?: (event: Event) => void;
  onSlotClick?: (slotDate: Date) => void;
}
const WeekCalendar: React.FC<WeekCalendarProps> = ({
  events,
  initialTimeFormat = "12h",
  startDate,
  disabled,
  weekStartsOn = 1,
  onEventClick,
  onSlotClick,
}) => {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        addDays(startOfWeek(startDate, { weekStartsOn }), i),
      ),
    [startDate, weekStartsOn],
  );

  const handleSlotClick = (slotDate: Date) => {
    if (disabled && disabled(slotDate)) {
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
        className={`absolute flex flex-col overflow-hidden rounded-sm p-1 text-xs leading-4 ${colorClasses[event.color]}`}
        style={style}
      >
        <p
          onClick={() => onEventClick?.(event)}
          className="z-10 truncate font-semibold hover:cursor-pointer"
        >
          {event.title}
        </p>
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
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-10 border-r p-1"></TableHead>
          {weekDays.map((day, index) => (
            <TableHead
              key={index}
              className={cn(
                "p-1 text-center text-xs font-semibold",
                isToday(day) && "bg-secondary text-foreground",
              )}
            >
              {format(day, "EEE dd/MM")}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((hour) => (
          <TableRow key={hour} className="h-12 hover:bg-transparent">
            <TableCell className="relative border-r p-1 text-right">
              <span className="absolute -top-4 right-1 font-mono text-xs leading-5">
                {formatHour(hour, startDate, initialTimeFormat)}
              </span>
            </TableCell>
            {weekDays.map((day, dayIndex) => {
              const slotDate = addHours(startOfDay(day), hour);
              const dayEvents = getEventsForDay(day, events);
              const eventLanes = calculateEventOverlaps(dayEvents);
              return (
                <TableCell key={`${dayIndex}-${hour}`} className="relative p-0">
                  {hour === 0 &&
                    eventLanes.map((lane, laneIndex) =>
                      lane.map((event) =>
                        renderEvent(event, laneIndex, eventLanes.length),
                      ),
                    )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className={`absolute inset-0 h-full w-full rounded-none ${
                          disabled && disabled(slotDate)
                            ? "bg-border hover:cursor-not-allowed"
                            : "transition-shadow duration-700 hover:shadow-inner"
                        }`}
                        onClick={() => handleSlotClick(slotDate)}
                        // disabled={isTimeDisabled(
                        //   slotDate,
                        //   disabledTimeRanges,
                        //   disabledSlots,
                        // )}
                        disabled={disabled?.(slotDate)}
                        aria-label={`Select time slot ${formatHour(hour, startDate, initialTimeFormat)} on ${format(day, "EEEE")}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary text-foreground">
                      {formatDateRange(slotDate, addHours(slotDate, 1))}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeekCalendar;
