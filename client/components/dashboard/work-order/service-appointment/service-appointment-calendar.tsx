"use client";

import { use, useState } from "react";
import { addHours, addWeeks, subWeeks } from "date-fns";
import { parseAsTimestamp, useQueryStates } from "nuqs";

import { Event } from "@/components/calendar/types";
import WeekCalendar from "@/components/calendar/week-calendar";
import { api, RouterOutput } from "@/trpc/client";
import DateSelector from "./date-selector";
import WeekNavigator from "./week-navigation";
import AppointmentDialog from "./appointment-dialog";
import { notFound } from "next/navigation";

interface ServiceAppointmentCalendarProps {
  work_order_id: string;
  initialData: Promise<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]
  >;
  team_identity: string;
}

export default function ServiceAppointmentCalendar({
  work_order_id,
  initialData,
  team_identity,
}: ServiceAppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useQueryStates({
    from: parseAsTimestamp,
    to: parseAsTimestamp,
  });

  const {
    data: { data: service_appointment },
  } = api.db.service_appointment.get.byWorkOrder.useQuery(
    { work_order_id },
    { initialData: use(initialData) },
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
          : addWeeks(selectedDate, 1),
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <AppointmentDialog
        open={selectedRange.from !== null}
        onOpenChange={(open) =>
          !open && setSelectedRange({ from: null, to: null })
        }
        dateRange={{
          from: selectedRange.from ?? undefined,
          to: selectedRange.to ?? undefined,
        }}
        date={selectedRange.from ?? new Date()}
        onDateRangeChange={setSelectedRange}
        work_order_id={work_order_id}
      />
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
        disabledTimeRanges={[
          {
            start: new Date("2024-09-10T00:00:00"),
            end: new Date("2024-09-10T07:00:00"),
          },
        ]}
        startDate={selectedDate}
        onSlotClick={(date) => {
          setSelectedRange({
            from: date,
            to: addHours(date, 1),
          });
        }}
      />
    </div>
  );
}
