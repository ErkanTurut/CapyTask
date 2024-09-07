import React, { useState } from "react";
import {
  format,
  addMinutes,
  startOfDay,
  endOfDay,
  differenceInMinutes,
} from "date-fns";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface TimeRange {
  from: Date;
  to: Date;
}

interface TimeSlotProps {
  time: Date;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface AppointmentProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  dayStart: Date;
}

interface ImprovedTimeSchedulerProps {
  date: Date;
  appointments: Appointment[];
  onSelectTimeSlot: (timeRange: TimeRange) => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  isSelected,
  onClick,
  children,
}) => (
  <div
    className={cn(
      "absolute inset-1 flex cursor-pointer flex-col overflow-y-auto rounded-lg p-1 text-xs leading-5",
      isSelected ? "bg-blue-100" : "bg-gray-50 hover:bg-gray-100",
    )}
    style={{
      top: `${((time.getHours() * 60 + time.getMinutes()) / 1440) * 100}%`,
      height: `${(100 / 1440) * 30}%`, // 30 minutes height
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

const AppointmentComponent: React.FC<AppointmentProps> = ({
  appointment,
  onClick,
  dayStart,
}) => {
  const startMinutes = differenceInMinutes(appointment.start, dayStart);
  const durationMinutes = differenceInMinutes(
    appointment.end,
    appointment.start,
  );

  return (
    <div
      className="absolute left-1 right-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-1 text-xs leading-5 hover:bg-blue-100"
      style={{
        top: `${(startMinutes / 1440) * 100}%`,
        height: `${(durationMinutes / 1440) * 100}%`,
        minHeight: "20px", // Ensure very short appointments are still visible
      }}
      onClick={() => onClick(appointment)}
    >
      <p className="truncate font-semibold text-blue-700">
        {appointment.title}
      </p>
      <p className="truncate text-blue-500">
        <time>{format(appointment.start, "h:mm a")}</time> -{" "}
        <time>{format(appointment.end, "h:mm a")}</time>
      </p>
    </div>
  );
};

const ImprovedTimeScheduler: React.FC<ImprovedTimeSchedulerProps> = ({
  date,
  appointments,
  onSelectTimeSlot,
  onSelectAppointment,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const handleTimeSlotClick = (time: Date) => {
    setSelectedSlot(time);
    onSelectTimeSlot({
      from: time,
      to: addMinutes(time, 30),
    });
  };

  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const timeSlots: Date[] = [];
  let currentTime = dayStart;

  while (currentTime < dayEnd) {
    timeSlots.push(currentTime);
    currentTime = addMinutes(currentTime, 30);
  }

  return (
    <div className="relative h-[600px] overflow-auto bg-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 z-10 h-full w-14 bg-white">
          {timeSlots
            .filter((_, index) => index % 2 === 0)
            .map((time) => (
              <div
                key={time.toISOString()}
                className="flex h-[60px] items-center justify-end pr-2"
              >
                <span className="text-xs text-gray-500">
                  {format(time, "h a")}
                </span>
              </div>
            ))}
        </div>
        <div className="relative ml-14 h-full">
          {timeSlots.map((time) => (
            <TimeSlot
              key={time.toISOString()}
              time={time}
              isSelected={
                selectedSlot !== null &&
                selectedSlot.getTime() === time.getTime()
              }
              onClick={() => handleTimeSlotClick(time)}
            >
              <time className="text-gray-500">{format(time, "h:mm a")}</time>
            </TimeSlot>
          ))}
          {appointments.map((appointment) => (
            <AppointmentComponent
              key={appointment.id}
              appointment={appointment}
              onClick={onSelectAppointment}
              dayStart={dayStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImprovedTimeScheduler;
