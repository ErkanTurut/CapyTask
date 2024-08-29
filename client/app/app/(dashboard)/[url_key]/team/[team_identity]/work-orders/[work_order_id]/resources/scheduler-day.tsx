import {
  format,
  addMinutes,
  startOfDay,
  endOfDay,
  differenceInMinutes,
  isSameDay,
} from "date-fns";
import { formatDate } from "@/lib/utils";
import { Database } from "@/types/supabase.types";
import { useState } from "react";

// Configuration object
const config = {
  timeSlotInterval: 60, // minutes
  dayStartHour: 0,
  dayEndHour: 24,
  pixelsPerMinute: 1, // 1 pixel per minute
};

// Types
type ServiceAppointment =
  Database["public"]["Tables"]["service_appointment"]["Row"];

interface TimeSlotProps {
  time: Date;
  height: number;
  isSelected: boolean;
  onClick: () => void;
}

interface AppointmentItemProps {
  appointment: ServiceAppointment;
  dayStart: Date;
  pixelsPerMinute: number;
}

interface DayScheduleProps {
  date: Date | null;
  appointments: ServiceAppointment[];
  selectedTimeSlot?: Date;
  onSelectTimeSlot?: (time: Date) => void;
}

// Components
const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  height,
  isSelected,
  onClick,
}) => (
  <div
    className={`flex cursor-pointer border-t border-gray-200 ${isSelected ? "bg-primary-foreground" : ""}`}
    style={{ height: `${height}px` }}
    onClick={onClick}
  >
    <div className="w-16 py-1 pr-2 text-right text-xs text-gray-500">
      {format(time, "HH:mm")}
    </div>
    <div className="relative flex-1"></div>
  </div>
);

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  dayStart,
  pixelsPerMinute,
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
        Appointment (
        {formatDate({ date: appointment.start_date, format: "LT" })} -{" "}
        {formatDate({ date: appointment.end_date, format: "LT" })})
      </div>
    </div>
  );
};

// Main component
export function DaySchedule({
  date,
  appointments,
  selectedTimeSlot,
  onSelectTimeSlot,
}: DayScheduleProps) {
  if (!date) return null;

  const [selectedSlot, setSelectedSlot] = useState<Date | null>(
    selectedTimeSlot || null,
  );

  const startTime = addMinutes(startOfDay(date), config.dayStartHour * 60);
  const endTime = addMinutes(startOfDay(date), config.dayEndHour * 60);
  const timeSlots = generateTimeSlots(
    startTime,
    endTime,
    config.timeSlotInterval,
  );

  // Calculate slot height based on the interval
  const slotHeight = config.timeSlotInterval * config.pixelsPerMinute;

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) =>
    isSameDay(new Date(appointment.start_date), date),
  );

  const handleSlotClick = (slotTime: Date) => {
    setSelectedSlot(slotTime);
    console.log("Selected slot date:", slotTime);
    if (onSelectTimeSlot) {
      onSelectTimeSlot(slotTime);
    }
  };

  return (
    <div className="relative">
      {timeSlots.map((slot, index) => (
        <TimeSlot
          key={index}
          time={slot}
          height={slotHeight}
          isSelected={
            selectedSlot
              ? isSameDay(selectedSlot, slot) &&
                selectedSlot.getHours() === slot.getHours() &&
                selectedSlot.getMinutes() === slot.getMinutes()
              : false
          }
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
    </div>
  );
}

// Utility function
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
