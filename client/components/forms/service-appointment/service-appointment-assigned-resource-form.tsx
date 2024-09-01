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
}

export default function ServiceAppointmentSchedulerForm({
  form,
}: ServiceAppointmentSchedulerFormProps) {
  const { append, remove, fields, update } = useFieldArray({
    control: form.control,
    name: "assigned_resource",
    keyName: "fieldId",
  });

  return (
    <FormField
      control={form.control}
      name="assigned_resource"
      render={({ field }) => <FormItem></FormItem>}
    />
  );
}
