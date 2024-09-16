import ServiceAppointmentCalendar from "@/components/dashboard/work-order/service-appointment/service-appointment-calendar";
import { Shell } from "@/components/shells";
import { ServiceAppointmentTable } from "@/components/tables/service-appointment/service-appointment-table";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Icons } from "@/components/icons";

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
      <Tabs defaultValue="service_appointment_table">
        <TabsList>
          <TabsTrigger value="service_appointment_table">
            <Icons.table className="mr-2 size-4" />
            Table
          </TabsTrigger>
          <TabsTrigger value="service_appointment_calendar">
            <Icons.calendar className="mr-2 size-4" />
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="service_appointment_table">
          <Suspense fallback={<TableSkeleton />}>
            <ServiceAppointmentTable
              params={params}
              initialData={initialData}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="service_appointment_calendar">
          <Suspense fallback="loading...">
            <ServiceAppointmentCalendar
              initialData={initialData}
              work_order_id={params.work_order_id}
              team_identity={params.team_identity}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </Shell>
    // <div className="flex h-full flex-col gap-2">
    //   <div className="grid h-full">
    // <ServiceAppointmentTable
    //   // rowCount={count ?? 0}
    //   // data={service_appointments}
    //   params={params}
    //   initialData={{ data: data ?? [], count: count ?? 0 }}
    // />
    //   </div>

    // </div>
  );
}
