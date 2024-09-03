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
              </div>
            </PopoverContent>
          </Popover>
          <DayScheduler
            date={selectedDate}
            selectedTimeSlot={{
              from: new Date(field.value.from),
              to: new Date(field.value.to),
            }}
            onSelectTimeSlot={(time) =>
              field.onChange({
                from: time.from?.toISOString(),
                to: time.to?.toISOString(),
              })
            }
            appointments={[]}
            className="h-[24rem] rounded-md border"
          />
        </FormItem>
      )}
    />
  );
}
