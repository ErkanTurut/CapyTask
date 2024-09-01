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
import { api, RouterOutput } from "@/trpc/client";
import { formatDateRange } from "little-date";
import { DateRange } from "react-day-picker";
import { TimePickerInput } from "@/components/time-picker-input";
import { Label } from "@/components/ui/label";
import { ServiceResourceComboBox } from "./serviceResourceCombobox";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { PopoverComboBox } from "@/components/popoverCombobox";

interface CreateServiceAppointmentProps {
  work_order: RouterOutput["db"]["work_order"]["get"]["detail"];
}

export function CreateServiceAppointment({
  work_order,
}: CreateServiceAppointmentProps) {
  if (!work_order) return null;
  const fromMinuteRef = React.useRef<HTMLInputElement>(null);
  const fromHourRef = React.useRef<HTMLInputElement>(null);
  const toMinuteRef = React.useRef<HTMLInputElement>(null);
  const toHourRef = React.useRef<HTMLInputElement>(null);
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
      setSelectedTimeSlot({
        from: undefined,
        to: undefined,
      });
    }
  };

  const handleTimeSlotSelect = (timeSlot: DateRange) => {
    setSelectedTimeSlot(timeSlot);
  };

  const disabledSlots = React.useMemo(() => {
    const slots: Date[] = [];
    let current = startOfDay(selectedDate);
    const end = endOfDay(selectedDate);

    while (current < end) {
      if (current.getHours() < 7 || current.getHours() >= 20) {
        slots.push(new Date(current));
      }
      current = addMinutes(current, 60);
    }

    return slots;
  }, [selectedDate]);

  const [selectedServiceResource, setSelectedServiceResource] = useState<
    string[]
  >([]);
  const handleSelectServiceResource = (value: string) => {
    if (selectedServiceResource.includes(value)) {
      setSelectedServiceResource(
        selectedServiceResource.filter((id) => id !== value),
      );
    } else {
      setSelectedServiceResource([...selectedServiceResource, value]);
    }
  };

  const { data: service_appointment } =
    api.db.service_appointment.get.byServiceResource.useQuery({
      service_resource_id: selectedServiceResource,
      dateRange: {
        from: startOfDay(selectedDate).toISOString(),
        to: endOfDay(selectedDate).toISOString(),
      },
    });

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
              {selectedTimeSlot.from && selectedTimeSlot.to
                ? formatDateRange(selectedTimeSlot.from, selectedTimeSlot.to)
                : format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="border-b border-dashed"
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
            <div className="flex w-full items-center justify-between p-2">
              <div className="flex w-full items-start gap-2">
                <div className="grid gap-1 text-center">
                  <Label htmlFor="hours" className="text-xs">
                    Hours
                  </Label>
                  <TimePickerInput
                    picker="hours"
                    date={selectedTimeSlot.from}
                    setDate={(e) =>
                      handleTimeSlotSelect({
                        ...selectedTimeSlot,
                        from: e,
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
                    date={selectedTimeSlot.from}
                    setDate={(e) =>
                      handleTimeSlotSelect({
                        ...selectedTimeSlot,
                        from: e,
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
                    date={selectedTimeSlot.to}
                    setDate={(e) =>
                      handleTimeSlotSelect({
                        ...selectedTimeSlot,
                        to: e,
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
                    date={selectedTimeSlot.to}
                    setDate={(e) =>
                      handleTimeSlotSelect({
                        ...selectedTimeSlot,
                        to: e,
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
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={(time) => handleTimeSlotSelect(time)}
          appointments={
            service_appointment?.data?.map((appointment) => ({
              id: appointment.id,
              start_date: new Date(appointment.start_date),
              end_date: new Date(appointment.end_date),
              title: "test",
            })) ?? []
          }
          disabledSlots={disabledSlots}
          className="h-[24rem] rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-2">
        {/* <PopoverComboBox>
          <Button variant={"outline"}>
            <span>Select Work item</span>
          </Button>
        </PopoverComboBox> */}
        <ServiceResourceComboBox
          selectedValues={selectedServiceResource}
          onSelect={handleSelectServiceResource}
        />
        <div className="flex flex-col gap-2">
          {selectedServiceResource.map((service_resource_id) => (
            <div
              className="flex flex-col rounded-md border p-2"
              key={service_resource_id}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs">{service_resource_id}</p>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    setSelectedServiceResource(
                      selectedServiceResource.filter(
                        (id) => id !== service_resource_id,
                      ),
                    );
                  }}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Badge variant={"success"}>available</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
