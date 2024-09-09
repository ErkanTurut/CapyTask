"use client";

import { use, useRef, useState } from "react";
import { addHours, addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { formatDateRange } from "little-date";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsTimestamp, useQueryState } from "nuqs";

import { Event } from "@/components/calendar/types";
import WeekCalendar from "@/components/calendar/week-calendar";
import DayCalendar from "@/components/calendar/day-calendar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api, RouterOutput } from "@/trpc/client";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";
import { DateRange } from "react-day-picker";

interface ServiceAppointmentCalendarProps {
  work_order_id: string;
  initialData: Promise<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]
  >;
}

export default function ServiceAppointmentCalendar({
  work_order_id,
  initialData,
}: ServiceAppointmentCalendarProps) {
  const [timestamp, setTimestamp] = useQueryState("ts", parseAsTimestamp);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const {
    data: { data },
  } = api.db.service_appointment.get.byWorkOrder.useQuery(
    { work_order_id },
    { initialData: use(initialData) },
  );

  const serviceAppointmentEvents: Event[] =
    data?.map((appointment) => ({
      start: new Date(appointment.start_date),
      end: new Date(appointment.end_date),
      title: appointment.id,
      color: "blue",
      id: appointment.id,
    })) ?? [];

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setSelectedDate(
      direction === "prev"
        ? subWeeks(selectedDate, 1)
        : addWeeks(selectedDate, 1),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <AppointmentDialog
        open={timestamp != null}
        onOpenChange={(open) => !open && setTimestamp(null)}
        dateRange={{
          start: timestamp ? new Date(timestamp) : new Date(),
          end: timestamp ? addHours(timestamp, 1) : new Date(),
        }}
        date={timestamp ?? new Date()}
      />

      <div className="flex items-center justify-between">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <WeekNavigator
          onPrevWeek={() => handleWeekChange("prev")}
          onNextWeek={() => handleWeekChange("next")}
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
        onSlotClick={setTimestamp}
      />
    </div>
  );
}

function DateSelector({
  selectedDate,
  onDateChange,
}: {
  selectedDate: Date;
  onDateChange: (date: Date | null) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start rounded-md text-left font-normal shadow-none"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          {formatDateRange(
            startOfWeek(selectedDate, { weekStartsOn: 1 }),
            endOfWeek(selectedDate, { weekStartsOn: 1 }),
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          weekStartsOn={1}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateChange(date)}
          className="border-b border-dashed"
        />
      </PopoverContent>
    </Popover>
  );
}

function WeekNavigator({
  onPrevWeek,
  onNextWeek,
}: {
  onPrevWeek: () => void;
  onNextWeek: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Button size="icon" variant="ghost" onClick={onPrevWeek}>
        <ChevronLeft className="size-4 text-muted-foreground" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onNextWeek}>
        <ChevronRight className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: { start: Date; end: Date };
  date: Date;
}

function AppointmentDialog({
  open,
  onOpenChange,
  dateRange,
  date,
}: AppointmentDialogProps) {
  const placeHolderEvent: Event = {
    title: "New appointment",
    start: dateRange.start,
    end: dateRange.end,
    color: "placeholder",
    isPlaceholder: true,
  };

  const fromMinuteRef = useRef<HTMLInputElement>(null);
  const fromHourRef = useRef<HTMLInputElement>(null);
  const toMinuteRef = useRef<HTMLInputElement>(null);
  const toHourRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="grid w-full sm:grid-cols-2">
          <div>
            <ScrollArea className="h-[26rem] p-2">
              <DayCalendar
                initialTimeFormat="24h"
                events={[placeHolderEvent]}
                date={date}
              />
            </ScrollArea>
            {/* <div className="flex w-full items-center justify-between p-2">
              <div className="flex w-full items-start gap-2">
                <div className="grid gap-1 text-center">
                  <Label htmlFor="hours" className="text-xs">
                    Hours
                  </Label>
                  <TimePickerInput
                    picker="hours"
                    date={dateRange.start}
                    setDate={(date) =>
                      field.onChange({
                        ...field.value,
                        from: date?.toISOString(),
                      })
                    }
                    ref={fromHourRef}
                    onRightFocus={() => fromMinuteRef.current?.focus()}
                  />
                </div>
                <div className="grid gap-1 text-center">
                  <Label htmlFor="minutes" className="text-xs">
                    Minutes
                  </Label>
                  <TimePickerInput
                    picker="minutes"
                    date={new Date(field.value.from)}
                    setDate={(date) =>
                      field.onChange({
                        ...field.value,
                        from: date?.toISOString(),
                      })
                    }
                    ref={fromMinuteRef}
                    onLeftFocus={() => fromHourRef.current?.focus()}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="grid gap-1 text-center">
                  <Label htmlFor="hours" className="text-xs">
                    Hours
                  </Label>
                  <TimePickerInput
                    picker="hours"
                    date={new Date(field.value.to)}
                    setDate={(date) =>
                      field.onChange({
                        ...field.value,
                        to: date?.toISOString(),
                      })
                    }
                    ref={toHourRef}
                    onRightFocus={() => toMinuteRef.current?.focus()}
                  />
                </div>
                <div className="grid gap-1 text-center">
                  <Label htmlFor="minutes" className="text-xs">
                    Minutes
                  </Label>
                  <TimePickerInput
                    picker="minutes"
                    date={new Date(field.value.to)}
                    setDate={(date) =>
                      field.onChange({
                        ...field.value,
                        to: date?.toISOString(),
                      })
                    }
                    ref={toMinuteRef}
                    onLeftFocus={() => toHourRef.current?.focus()}
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div></div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
