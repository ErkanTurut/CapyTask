"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay, addHours } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RouterOutput } from "@/trpc/client";
import { DaySchedule } from "./scheduler-day";

interface CreateServiceAppointmentProps {
  work_order: RouterOutput["db"]["work_order"]["get"]["detail"];
}

export function CreateServiceAppointment({
  work_order,
}: CreateServiceAppointmentProps) {
  if (!work_order) return null;

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(work_order.sheduled_start || new Date()),
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex h-full gap-4 rounded-md border p-4">
      <div className="w-64">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
          disabled={(date) => {
            const scheduledStart = work_order.sheduled_start
              ? new Date(work_order.sheduled_start)
              : null;
            const scheduledEnd = work_order.sheduled_end
              ? new Date(work_order.sheduled_end)
              : null;

            if (!scheduledStart || !scheduledEnd) {
              return false; // If either date is null, don't disable any dates
            }

            return date < scheduledStart || date > scheduledEnd;
          }}
        />
      </div>
      <ScrollArea className="h-[300px] flex-1 rounded-md border p-2">
        <DaySchedule
          date={selectedDate}
          selectedTimeSlot={selectedDate}
          onSelectTimeSlot={(time) => setSelectedDate(time)}
          appointments={[
            {
              id: "1",
              start_date: new Date().toISOString(),
              end_date: addHours(new Date(), 1).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              team_id: "1",
              work_order_id: "1",
              workspace_id: "1",
            },
          ]}
        />
      </ScrollArea>
    </div>
  );
}
