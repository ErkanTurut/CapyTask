"use client";

import { DayScheduler } from "@/components/day-scheduler";
import { TimePickerInput } from "@/components/time-picker-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addMinutes, endOfDay, format, startOfDay } from "date-fns";
import { formatDateRange } from "little-date";
import { CalendarIcon } from "lucide-react";

import {
  useFieldArray,
  useFormContext,
  type UseFormReturn,
} from "react-hook-form";
import { useMemo, useRef, useState } from "react";
import { TCreateServiceAppointmentSchema } from "@/trpc/server/routes/service_appointment/create.schema";
import { api } from "@/trpc/client";
import { DateRange } from "react-day-picker";
import { FormField, FormItem } from "@/components/ui/form";

interface ServiceAppointmentSchedulerFormProps {
  form: UseFormReturn<TCreateServiceAppointmentSchema>;
  dateRange: DateRange;
}

export default function ServiceAppointmentSchedulerForm({
  form,
  dateRange,
}: ServiceAppointmentSchedulerFormProps) {
  const fromMinuteRef = useRef<HTMLInputElement>(null);
  const fromHourRef = useRef<HTMLInputElement>(null);
  const toMinuteRef = useRef<HTMLInputElement>(null);
  const toHourRef = useRef<HTMLInputElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(dateRange.from || new Date()),
  );

  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<DateRange>({
  //   from: undefined,
  //   to: undefined,
  // });

  // const handleDateSelect = (date: Date | undefined) => {
  //   if (date) {
  //     setSelectedDate(date);
  //     setSelectedTimeSlot({
  //       from: undefined,
  //       to: undefined,
  //     });
  //   }
  // };

  // const handleTimeSlotSelect = (timeSlot: DateRange) => {
  //   setSelectedTimeSlot(timeSlot);
  // };

  // const disabledSlots = useMemo(() => {
  //   const slots: Date[] = [];
  //   let current = startOfDay(selectedDate);
  //   const end = endOfDay(selectedDate);

  //   while (current < end) {
  //     if (current.getHours() < 7 || current.getHours() >= 20) {
  //       slots.push(new Date(current));
  //     }
  //     current = addMinutes(current, 60);
  //   }

  //   return slots;
  // }, [selectedDate]);

  // const [selectedServiceResource, setSelectedServiceResource] = useState<
  //   string[]
  // >([]);
  // const handleSelectServiceResource = (value: string) => {
  //   if (selectedServiceResource.includes(value)) {
  //     setSelectedServiceResource(
  //       selectedServiceResource.filter((id) => id !== value),
  //     );
  //   } else {
  //     setSelectedServiceResource([...selectedServiceResource, value]);
  //   }
  // };

  // const { data: service_appointment } =
  //   api.db.service_appointment.get.byServiceResource.useQuery({
  //     service_resource_id: selectedServiceResource,
  //     dateRange: {
  //       from: startOfDay(selectedDate).toISOString(),
  //       to: endOfDay(selectedDate).toISOString(),
  //     },
  //   });

  return (
    <FormField
      control={form.control}
      name="date_range"
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange(
                  new Date(field.value.from),
                  new Date(field.value.to),
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date || new Date());
                }}
                initialFocus
                className="border-b border-dashed"
                // disabled={(date) => {
                //   const scheduledStart = work_order.sheduled_start
                //     ? new Date(work_order.sheduled_start)
                //     : null;
                //   const scheduledEnd = work_order.sheduled_end
                //     ? new Date(work_order.sheduled_end)
                //     : null;

                //   if (!scheduledStart || !scheduledEnd) {
                //     return false; // If either date is null, don't disable any dates
                //   }

                //   return date < scheduledStart || date > scheduledEnd;
                // }}
              />
              <div className="flex w-full items-center justify-between p-2">
                <div className="flex w-full items-start gap-2">
                  <div className="grid gap-1 text-center">
                    <Label htmlFor="hours" className="text-xs">
                      Hours
                    </Label>
                    <TimePickerInput
                      picker="hours"
                      date={new Date(field.value.from)}
                      setDate={field.onChange}
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
                      setDate={field.onChange}
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
                      setDate={field.onChange}
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
                      setDate={field.onChange}
                      ref={toMinuteRef}
                      onLeftFocus={() => toHourRef.current?.focus()}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DayScheduler
            date={selectedDate}
            selectedTimeSlot={{
              from: new Date(field.value.from),
              to: new Date(field.value.to),
            }}
            onSelectTimeSlot={(time) => field.onChange(time)}
            appointments={
              []
              // service_appointment?.data?.map((appointment) => ({
              //   id: appointment.id,
              //   start_date: new Date(appointment.start_date),
              //   end_date: new Date(appointment.end_date),
              //   title: "test",
              // })) ?? []
            }
            // disabledSlots={disabledSlots}

            className="h-[24rem] rounded-md border"
          />
        </FormItem>
      )}
    />
  );
}
