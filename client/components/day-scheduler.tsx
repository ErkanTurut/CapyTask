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
import { cn, formatDate } from "@/lib/utils";
import { Database } from "@/types/supabase.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { DateRange } from "react-day-picker";
import { Resizable } from "re-resizable";

// Configuration object
const config = {
  timeSlotInterval: 60,
  dayStartHour: 0,
  dayEndHour: 24,
  pixelsPerMinute: 1,
};

// Types
type ServiceAppointment = {
  id: string;
  start_date: Date;
  end_date: Date;
  title: string;
};

interface AppointmentItemProps {
  appointment: ServiceAppointment;
  dayStart: Date;
  pixelsPerMinute: number;
}

interface TimeSlotItemProps {
  time: Date;
  height: number;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

interface SelectedTimeSlotOverlayProps {
  range: DateRange;
  dayStart: Date;
  pixelsPerMinute: number;
  onResize: (height: string) => void;
}

interface DaySchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  appointments: ServiceAppointment[];
  selectedTimeSlot?: DateRange;
  onSelectTimeSlot?: (range: DateRange) => void;
  disabledSlots?: Date[];
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
  forwardRef<HTMLDivElement, TimeSlotItemProps>(
    ({ time, height, isSelected, isDisabled, onClick }, ref) => (
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
        <div className="relative flex-1"></div>
      </div>
    ),
  ),
);

const AppointmentItem = React.memo(
  forwardRef<HTMLDivElement, AppointmentItemProps>(
    ({ appointment, dayStart, pixelsPerMinute }, ref) => {
      const startMinutes = differenceInMinutes(
        appointment.start_date,
        dayStart,
      );
      const durationMinutes = differenceInMinutes(
        appointment.end_date,
        appointment.start_date,
      );
      const top = startMinutes * pixelsPerMinute;
      const height = durationMinutes * pixelsPerMinute;

      return (
        <div
          ref={ref}
          className="absolute left-16 right-0 overflow-hidden rounded-md bg-gray-400 p-1 text-white"
          style={{ top: `${top}px`, height: `${height}px`, minHeight: "24px" }}
        >
          <div className="text-xs">
            Appointment (
            {formatDate({ date: appointment.start_date, format: "LT" })} -{" "}
            {formatDate({ date: appointment.end_date, format: "LT" })})
          </div>
        </div>
      );
    },
  ),
);

const SelectedTimeSlotOverlay = React.memo(
  ({
    range,
    dayStart,
    pixelsPerMinute,
    onResize,
  }: SelectedTimeSlotOverlayProps) => {
    if (!range.from || !range.to) return null;

    const endTime = addMinutes(dayStart, config.dayEndHour * 60);
    const totalMinutes = differenceInMinutes(endTime, range.from);

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
          position: "absolute",
        }}
        size={{
          width: "auto",
          height: `${height}px`,
        }}
        snap={{
          y: Array.from(
            { length: Math.ceil((totalMinutes * pixelsPerMinute) / 15) },
            (_, i) => i * 15,
          ),
        }}
        onResize={(_, direction, ref) => {
          onResize(ref.style.height);
        }}
      >
        <div className="text-xs">
          Selected ({formatDate({ date: range.from, format: "LT" })} -{" "}
          {formatDate({ date: range.to, format: "LT" })})
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
    },
    ref,
  ) => {
    if (!date) {
      return "Pick a date range";
    }

    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const timeSlotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const lastDateRef = useRef(date);

    const startTime = useMemo(
      () => addMinutes(startOfDay(date), config.dayStartHour * 60),
      [date],
    );
    const endTime = useMemo(
      () => addMinutes(startOfDay(date), config.dayEndHour * 60),
      [date],
    );
    const timeSlots = useMemo(
      () => generateTimeSlots(startTime, endTime, config.timeSlotInterval),
      [startTime, endTime],
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
      if (!isSameDay(date, lastDateRef.current)) {
        scrollToFirstAvailableSlot();
        lastDateRef.current = date;
      }
    }, [date, scrollToFirstAvailableSlot]);

    useEffect(() => {
      scrollToFirstAvailableSlot();
    }, []);

    const handleSlotClick = useCallback(
      (slotTime: Date) => {
        if (!isSlotDisabled(slotTime) && onSelectTimeSlot) {
          const endTime = addMinutes(slotTime, config.timeSlotInterval);
          onSelectTimeSlot({ from: slotTime, to: endTime });
        }
      },
      [isSlotDisabled, onSelectTimeSlot],
    );

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
              onResize={(height) => {
                if (selectedTimeSlot?.from) {
                  const newEndTime = addMinutes(
                    selectedTimeSlot.from,
                    Math.round(parseInt(height) / config.pixelsPerMinute),
                  );
                  if (onSelectTimeSlot && newEndTime > selectedTimeSlot.from) {
                    onSelectTimeSlot({
                      from: selectedTimeSlot.from,
                      to: newEndTime,
                    });
                  }
                }
              }}
            />
          )}
        </div>
      </ScrollArea>
    );
  },
);

DayScheduler.displayName = "DayScheduler";

export default DayScheduler;
