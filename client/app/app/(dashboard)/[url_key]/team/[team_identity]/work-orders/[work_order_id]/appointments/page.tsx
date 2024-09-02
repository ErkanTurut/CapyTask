import { ServiceAppointmentCreateForm } from "@/components/forms/service-appointment/service-appointment-create-form";
import { ServiceAppointmentTable } from "@/components/tables/service-appointment/service-appointment-table";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { AppointmentModal } from "./appointment-modal";

interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data: service_appointments, count } =
    await trpc.db.service_appointment.get.byWorkOrder({
      work_order_id: params.work_order_id,
    });

  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) return notFound();

  return (
    <div className="flex h-full flex-col gap-2">
      <AppointmentModal>
        {/* <CreateServiceAppointment work_order={work_order} /> */}
        <ServiceAppointmentCreateForm work_order={work_order} />
      </AppointmentModal>
      <div className="grid h-full">
        <ServiceAppointmentTable
          rowCount={count ?? 0}
          data={service_appointments}
        />
      </div>
    </div>
  );
}
