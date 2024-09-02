"use client";

import React, { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { api, RouterOutput } from "@/trpc/client";

import {
  createServiceAppointmentSchema,
  TCreateServiceAppointmentSchema,
} from "@/trpc/server/routes/service_appointment/create.schema";
import ServiceAppointmentSchedulerForm from "./service-appointment-scheduler-form";
import { ServiceAppointmentServiceResourceForm } from "./service-appointment-service-resource-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ServiceAppointmentCreateFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  work_order: NonNullable<RouterOutput["db"]["work_order"]["get"]["detail"]>;
}

export function ServiceAppointmentCreateForm({
  work_order,
  className,
}: ServiceAppointmentCreateFormProps) {
  const { mutate, isPending } = api.db.service_appointment.create.useMutation({
    onSuccess: () => {
      toast.success("Service Appointment created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const firstAvailableSlotOfTheDay = useMemo(() => {
    const start = work_order.sheduled_start
      ? new Date(work_order.sheduled_start)
      : new Date();

    // Set the start time to the beginning of the day (midnight)
    start.setHours(0, 0, 0, 0);

    // Create an end time 1 hour after the start time
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    return {
      from: start.toISOString(),
      to: end.toISOString(),
    };
  }, [work_order]);

  // react-hook-form
  const form = useForm<TCreateServiceAppointmentSchema>({
    resolver: zodResolver(createServiceAppointmentSchema),

    values: {
      work_order_id: work_order.id,
      team_id: work_order.team_id,
      workspace_id: work_order.workspace_id,
      date_range: {
        from: firstAvailableSlotOfTheDay.from,
        to: firstAvailableSlotOfTheDay.to,
      },
      work_order_item_id: undefined,
      service_resource: [],
    },
  });

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        className={cn("grid h-full gap-4 sm:grid-cols-2", className)}
        onSubmit={(...args) =>
          void form.handleSubmit((data) => {
            mutate(data);
            // console.log(data);
          })(...args)
        }
      >
        <div className="flex flex-col gap-2">
          <ServiceAppointmentSchedulerForm
            form={form}
            dateRange={{
              from: new Date(form.getValues("date_range.from")),
              to: new Date(form.getValues("date_range.to")),
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <ServiceAppointmentServiceResourceForm form={form} />
        </div>
        <div className="col-span-full flex justify-end">
          <Button isLoading={isPending} type="submit">
            Create Service Appointment
          </Button>
        </div>
      </form>
    </Form>
  );
}
