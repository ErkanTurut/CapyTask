"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayScheduler } from "@/components/day-scheduler";
import { Calendar } from "@/components/ui/calendar";
import {
  format,
  addDays,
  isSameDay,
  addHours,
  startOfDay,
  endOfDay,
  addMinutes,
} from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RouterOutput } from "@/trpc/client";
import { formatDateRange } from "little-date";
import { DateRange } from "react-day-picker";

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

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeSlotSelect = (timeSlot: DateRange) => {
    console.log(timeSlot);
    setSelectedTimeSlot(timeSlot);
    // Don't scroll here, as we're staying within the same day
  };

  // Define disabledSlots here
  const disabledSlots = React.useMemo(() => {
    const slots: Date[] = [];
    let current = startOfDay(selectedDate);
    const end = endOfDay(selectedDate);

    while (current < end) {
      if (current.getHours() < 7 || current.getHours() >= 20) {
        slots.push(new Date(current));
      }
      current = addMinutes(current, 60); // Assuming 60-minute intervals
    }

    return slots;
  }, [selectedDate]);

  return (
    <div className="grid h-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
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
          </PopoverContent>
        </Popover>
        <DayScheduler
          date={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={(time) => handleTimeSlotSelect(time)}
          appointments={[
            {
              id: "1",
              start_date: new Date().toISOString(),
              end_date: addHours(new Date(), 1).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              team_id: "1",
              work_order_id: "1",
              work_order_item_id: "1",
              workspace_id: "1",
            },
          ]}
          disabledSlots={disabledSlots}
          className="h-[24rem] rounded-md border"
        />
      </div>
    </div>
  );
}
