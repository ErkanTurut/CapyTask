"use client";

import { use, useEffect, useMemo, useState } from "react";
import {
  addDays,
  addHours,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  subWeeks,
} from "date-fns";
import {
  parseAsBoolean,
  parseAsTimestamp,
  useQueryState,
  useQueryStates,
} from "nuqs";

import { Event } from "@/components/calendar/types";
import WeekCalendar from "@/components/calendar/week-calendar";
import { api, RouterOutput } from "@gembuddy/trpc/client";
import DateSelector from "./date-selector";
import WeekNavigator from "@/components/calendar/week-navigation";
import AppointmentDialog from "./appointment-dialog";
import { notFound } from "next/navigation";
import { Shift } from "@/lib/types";
import { getWorkShiftsFromDateRange } from "@gembuddy/lib/utils";

interface ServiceAppointmentCalendarProps {
  work_order_id: string;
  initialData: Promise<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]
  >;
  team_identity: string;
}
interface TimeRange {
  start: Date;
  end: Date;
}
export default function ServiceAppointmentCalendar({
  work_order_id,
  initialData,
  team_identity,
}: ServiceAppointmentCalendarProps) {
  const shift: Shift = {
    start_time: "07:00",
    end_time: "19:00",
    days: [1, 2, 3, 4, 5], // Monday to Friday
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useQueryStates({
    from: parseAsTimestamp,
    to: parseAsTimestamp,
  });

  const {
    data: { data: service_appointment },
  } = api.db.service_appointment.get.byWorkOrder.useQuery(
    { work_order_id },
    { initialData: use(initialData) }
  );

  const serviceAppointmentEvents: Event[] =
    service_appointment?.map((appointment) => ({
      start: new Date(appointment.start_date),
      end: new Date(appointment.end_date),
      title: appointment.id,
      color: "blue",
      id: appointment.id,
    })) ?? [];

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleWeekChange = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(
        direction === "prev"
          ? subWeeks(selectedDate, 1)
          : addWeeks(selectedDate, 1)
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedRange.from && (
        <AppointmentDialog
          open={selectedRange.from !== null}
          onOpenChange={(open) =>
            !open && setSelectedRange({ from: null, to: null })
          }
          dateRange={{
            from: selectedRange.from ?? undefined,
            to: selectedRange.to ?? undefined,
          }}
          date={selectedRange.from}
          onDateRangeChange={setSelectedRange}
          work_order_id={work_order_id}
          team_identity={team_identity}
        />
      )}
      <div className="flex items-center justify-between">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <WeekNavigator
          onPrevWeek={() => handleWeekChange("prev")}
          onNextWeek={() => handleWeekChange("next")}
          onToday={() => handleWeekChange("today")}
        />
      </div>

      <WeekCalendar
        initialTimeFormat="24h"
        events={serviceAppointmentEvents}
        startDate={selectedDate}
        onSlotClick={(date) => {
          setSelectedRange({
            from: date,
            to: addHours(date, 1),
          });
        }}
        disabled={(date) => {
          const workShifts = getWorkShiftsFromDateRange(
            startOfWeek(selectedDate, { weekStartsOn: 1 }),
            endOfWeek(selectedDate, { weekStartsOn: 1 }),
            shift
          );
          return !workShifts.some((shift) =>
            isWithinInterval(date, { start: shift.start, end: shift.end })
          );
        }}
      />
    </div>
  );
}
