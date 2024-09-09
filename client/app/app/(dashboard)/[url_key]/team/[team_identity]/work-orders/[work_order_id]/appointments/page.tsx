import ServiceAppointmentCalendar from "@/components/dashboard/work-order/service-appointment-calendar";
import { Shell } from "@/components/shells";
import { ServiceAppointmentTable } from "@/components/tables/service-appointment/service-appointment-table";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const initialData = trpc.db.service_appointment.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });

  return (
    <Shell>
      <Suspense fallback="loading...">
        <ServiceAppointmentCalendar
          initialData={initialData}
          work_order_id={params.work_order_id}
        />
      </Suspense>
    </Shell>
    // <div className="flex h-full flex-col gap-2">
    //   <div className="grid h-full">
    //     <ServiceAppointmentTable
    //       // rowCount={count ?? 0}
    //       // data={service_appointments}
    //       params={params}
    //       initialData={{ data: data ?? [], count: count ?? 0 }}
    //     />
    //   </div>

    // </div>
  );
}
