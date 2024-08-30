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

// Configuration object moved outside of the component
const config = {
  timeSlotInterval: 60,
  dayStartHour: 0,
  dayEndHour: 24,
  pixelsPerMinute: 1,
};
interface AppointmentItemProps {
  appointment: ServiceAppointment;
  dayStart: Date;
  pixelsPerMinute: number;
}

type ServiceAppointment =
  Database["public"]["Tables"]["service_appointment"]["Row"];

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
  onResize: (height: number) => void;
}

const SelectedTimeSlotOverlay = React.memo(
  ({
    range,
    dayStart,
    pixelsPerMinute,
    onResize,
  }: SelectedTimeSlotOverlayProps) => {
    if (!range.from || !range.to) return null;

    const startMinutes = differenceInMinutes(range.from, dayStart);
    const durationMinutes = differenceInMinutes(range.to, range.from);
    const top = startMinutes * pixelsPerMinute;
    const height = durationMinutes * pixelsPerMinute;

    return (
      <Resizable defaultSize={{ height }}>
        <div
          className="absolute left-16 right-0 overflow-hidden rounded-md bg-primary/80 p-1 text-primary-foreground"
          style={{ top: `${top}px`, height: `${height}px`, minHeight: "24px" }}
        >
          <div className="text-xs">
            Selected ({formatDate({ date: range.from, format: "LT" })} -{" "}
            {formatDate({ date: range.to, format: "LT" })})
          </div>
        </div>
      </Resizable>
    );
  },
);
interface DaySchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date; // Change this from 'date: Date | undefined'
  appointments: ServiceAppointment[];
  selectedTimeSlot?: DateRange; // Change this to DateRange
  onSelectTimeSlot?: (range: DateRange) => void; // Update this to accept DateRange
  disabledSlots?: Date[];
}

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

export interface DaySchedulerRef {
  scrollToFirstAvailableSlot: () => void;
}

function generateTimeSlots(
  start: Date,
  end: Date,
  intervalMinutes: number,
): Date[] {
  const slots: Date[] = [];
  let current = start;
  while (current < end) {
    slots.push(current);
    current = addMinutes(current, intervalMinutes);
  }
  return slots;
}

export const DayScheduler = forwardRef<DaySchedulerRef, DaySchedulerProps>(
  (
    {
      date, // Change this from 'date'
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
    const isMounted = useIsMounted();

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
      (slot: Date) => {
        return disabledSlots.some(
          (disabledSlot) =>
            isSameDay(slot, disabledSlot) &&
            slot.getHours() === disabledSlot.getHours() &&
            slot.getMinutes() === disabledSlot.getMinutes(),
        );
      },
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
          slotElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, [timeSlots, isSlotDisabled]);

    useImperativeHandle(ref, () => ({
      scrollToFirstAvailableSlot,
    }));

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
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot?.from
              ? isSameDay(selectedTimeSlot.from, slot) &&
                selectedTimeSlot.from.getHours() === slot.getHours() &&
                selectedTimeSlot.from.getMinutes() === slot.getMinutes()
              : false;

            return (
              <TimeSlotItem
                key={slot.toISOString()}
                ref={(el) => {
                  timeSlotRefs.current[slot.toISOString()] = el;
                }}
                time={slot}
                height={config.timeSlotInterval * config.pixelsPerMinute}
                isSelected={isSelected}
                isDisabled={isSlotDisabled(slot)}
                onClick={() => handleSlotClick(slot)}
              />
            );
          })}
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
            />
          )}
        </div>
      </ScrollArea>
    );
  },
);

DayScheduler.displayName = "DayScheduler";

export default DayScheduler;
