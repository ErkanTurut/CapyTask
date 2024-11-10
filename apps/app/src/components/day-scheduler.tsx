"use client";

import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  format,
  addMinutes,
  startOfDay,
  endOfDay,
  differenceInMinutes,
  isSameDay,
} from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { DateRange } from "react-day-picker";
import { Resizable } from "re-resizable";

// Types
type ServiceAppointment = {
  id: string;
  start_date: Date;
  end_date: Date;
  title: string;
};

interface DaySchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  appointments: ServiceAppointment[];
  selectedTimeSlot?: DateRange;
  onSelectTimeSlot?: (range: DateRange) => void;
  disabledSlots?: Date[];
  config?: {
    timeSlotInterval: number;
    dayStartHour: number;
    dayEndHour: number;
    pixelsPerMinute: number;
  };
}

export interface DaySchedulerRef {
  scrollToFirstAvailableSlot: () => void;
}

// Helper functions
const generateTimeSlots = (
  start: Date,
  end: Date,
  intervalMinutes: number,
): Date[] => {
  const slots: Date[] = [];
  let current = start;
  while (current < end) {
    slots.push(current);
    current = addMinutes(current, intervalMinutes);
  }
  return slots;
};

// Components
const TimeSlotItem = React.memo(
  forwardRef<
    HTMLDivElement,
    {
      time: Date;
      height: number;
      isSelected: boolean;
      isDisabled: boolean;
      onClick: () => void;
    }
  >(({ time, height, isSelected, isDisabled, onClick }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer border-t border-gray-200",
        isSelected ? "bg-primary-foreground" : "",
        isDisabled ? "cursor-not-allowed border bg-muted opacity-50" : "",
      )}
      style={{ height: `${height}px` }}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="w-16 py-1 pr-2 text-right text-xs text-gray-500">
        {format(time, "HH:mm")}
      </div>
      <div className="relative flex-1" />
    </div>
  )),
);

const AppointmentItem = React.memo(
  ({
    appointment,
    dayStart,
    pixelsPerMinute,
  }: {
    appointment: ServiceAppointment;
    dayStart: Date;
    pixelsPerMinute: number;
  }) => {
    const startMinutes = differenceInMinutes(appointment.start_date, dayStart);
    const durationMinutes = differenceInMinutes(
      appointment.end_date,
      appointment.start_date,
    );
    const top = startMinutes * pixelsPerMinute;
    const height = durationMinutes * pixelsPerMinute;

    return (
      <div
        className="absolute left-16 right-0 overflow-hidden rounded-md bg-gray-400 p-1 text-white"
        style={{ top: `${top}px`, height: `${height}px`, minHeight: "24px" }}
      >
        <div className="text-xs">
          {appointment.title} ({format(appointment.start_date, "HH:mm")} -{" "}
          {format(appointment.end_date, "HH:mm")})
        </div>
      </div>
    );
  },
);

const SelectedTimeSlotOverlay = React.memo(
  ({
    range,
    dayStart,
    pixelsPerMinute,
    onResize,
  }: {
    range: DateRange;
    dayStart: Date;
    pixelsPerMinute: number;
    onResize: (height: string) => void;
  }) => {
    if (!range.from || !range.to) return null;

    const startMinutes = differenceInMinutes(range.from, dayStart);
    const durationMinutes = differenceInMinutes(range.to, range.from);
    const top = startMinutes * pixelsPerMinute;
    const height = durationMinutes * pixelsPerMinute;

    return (
      <Resizable
        className="absolute left-16 right-0 overflow-hidden rounded-md bg-primary/80 p-1 text-primary-foreground"
        style={{
          top: `${top}px`,
          height: `${height}px`,
          minHeight: "24px",
        }}
        size={{ width: "auto", height: `${height}px` }}
        onResize={(_, __, ref) => onResize(ref.style.height)}
      >
        <div className="text-xs">
          Selected ({format(range.from, "HH:mm")} - {format(range.to, "HH:mm")})
        </div>
      </Resizable>
    );
  },
);

// Main component
export const DayScheduler = forwardRef<DaySchedulerRef, DaySchedulerProps>(
  (
    {
      date,
      appointments,
      selectedTimeSlot,
      onSelectTimeSlot,
      disabledSlots = [],
      className,
      config = {
        timeSlotInterval: 60,
        dayStartHour: 0,
        dayEndHour: 24,
        pixelsPerMinute: 1,
      },
    },
    ref,
  ) => {
    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const timeSlotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const startTime = useMemo(
      () => addMinutes(startOfDay(date), config.dayStartHour * 60),
      [date, config.dayStartHour],
    );
    const endTime = useMemo(
      () => addMinutes(startOfDay(date), config.dayEndHour * 60),
      [date, config.dayEndHour],
    );
    const timeSlots = useMemo(
      () => generateTimeSlots(startTime, endTime, config.timeSlotInterval),
      [startTime, endTime, config.timeSlotInterval],
    );

    const filteredAppointments = useMemo(
      () =>
        appointments.filter((appointment) =>
          isSameDay(new Date(appointment.start_date), date),
        ),
      [appointments, date],
    );

    const isSlotDisabled = useCallback(
      (slot: Date) =>
        disabledSlots.some(
          (disabledSlot) =>
            isSameDay(slot, disabledSlot) &&
            slot.getHours() === disabledSlot.getHours() &&
            slot.getMinutes() === disabledSlot.getMinutes(),
        ),
      [disabledSlots],
    );

    const scrollToFirstAvailableSlot = useCallback(() => {
      const firstAvailableSlot = timeSlots.find(
        (slot) => !isSlotDisabled(slot),
      );
      if (firstAvailableSlot) {
        const slotKey = firstAvailableSlot.toISOString();
        const slotElement = timeSlotRefs.current[slotKey];
        if (slotElement && scrollViewportRef.current) {
          slotElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, [timeSlots, isSlotDisabled]);

    useImperativeHandle(ref, () => ({ scrollToFirstAvailableSlot }));

    useEffect(() => {
      scrollToFirstAvailableSlot();
    }, [date, scrollToFirstAvailableSlot]);

    const handleSlotClick = useCallback(
      (slotTime: Date) => {
        if (!isSlotDisabled(slotTime) && onSelectTimeSlot) {
          const endTime = addMinutes(slotTime, config.timeSlotInterval);
          onSelectTimeSlot({ from: slotTime, to: endTime });
        }
      },
      [isSlotDisabled, onSelectTimeSlot, config.timeSlotInterval],
    );

    const handleResizeSelectedSlot = useCallback(
      (height: string) => {
        if (selectedTimeSlot?.from && onSelectTimeSlot) {
          const newEndTime = addMinutes(
            selectedTimeSlot.from,
            Math.round(parseInt(height) / config.pixelsPerMinute),
          );
          if (newEndTime > selectedTimeSlot.from) {
            onSelectTimeSlot({ from: selectedTimeSlot.from, to: newEndTime });
          }
        }
      },
      [selectedTimeSlot, onSelectTimeSlot, config.pixelsPerMinute],
    );

    if (!date) {
      return <div className="p-4 text-center">Please select a date</div>;
    }

    return (
      <ScrollArea className={cn("h-[16rem]", className)}>
        <div ref={scrollViewportRef} className="relative">
          {timeSlots.map((slot) => (
            <TimeSlotItem
              key={slot.toISOString()}
              ref={(el) => {
                timeSlotRefs.current[slot.toISOString()] = el;
              }}
              time={slot}
              height={config.timeSlotInterval * config.pixelsPerMinute}
              isSelected={
                selectedTimeSlot?.from
                  ? isSameDay(selectedTimeSlot.from, slot) &&
                    selectedTimeSlot.from.getHours() === slot.getHours() &&
                    selectedTimeSlot.from.getMinutes() === slot.getMinutes()
                  : false
              }
              isDisabled={isSlotDisabled(slot)}
              onClick={() => handleSlotClick(slot)}
            />
          ))}
          {filteredAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              dayStart={startTime}
              pixelsPerMinute={config.pixelsPerMinute}
            />
          ))}
          {selectedTimeSlot && (
            <SelectedTimeSlotOverlay
              range={selectedTimeSlot}
              dayStart={startTime}
              pixelsPerMinute={config.pixelsPerMinute}
              onResize={handleResizeSelectedSlot}
            />
          )}
        </div>
      </ScrollArea>
    );
  },
);

DayScheduler.displayName = "DayScheduler";

export default DayScheduler;
