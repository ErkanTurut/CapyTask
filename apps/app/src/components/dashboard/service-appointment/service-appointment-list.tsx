"use client";

import { api } from "@gembuddy/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
import { endOfWeek, startOfWeek } from "date-fns";
import { formatDateRange } from "little-date";
import { use } from "react";
type ServiceAppointmentListProps = {
  serviceAppointmentQuery: ReturnType<
    typeof trpc.db.service_appointment.get.byServiceResource
  >;
};

export function ServiceAppointmentList({
  serviceAppointmentQuery,
}: ServiceAppointmentListProps) {
  const {
    data: { data: serviceAppointments },
  } = api.db.service_appointment.get.byServiceResource.useQuery(
    {
      date_range: {
        from: startOfWeek(new Date()).toISOString(),
        to: endOfWeek(new Date()).toISOString(),
      },
      service_resource_id: ["3ef743fc-5173-4239-a6d3-a68dfc0276b3"],
    },
    { initialData: use(serviceAppointmentQuery) },
  );
  if (!serviceAppointments) {
    return;
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      {serviceAppointments.map((serviceAppointment) => {
        return (
          <div
            key={serviceAppointment.id}
            className="flex flex-col p-2 border rounded-md w-full"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{serviceAppointment.id} </p>
              <p className="text-xs text-muted-foreground">
                {formatDateRange(
                  new Date(serviceAppointment.start_date),
                  new Date(serviceAppointment.end_date),
                )}
              </p>
            </div>
            {/* {serviceAppointment.work_order_item && (
              <StatusSelector
                status={serviceAppointment.work_order_item?.status}
              />
            )} */}
          </div>
        );
      })}
    </div>
  );
}
