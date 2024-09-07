import { ServiceAppointmentCreateForm } from "@/components/forms/service-appointment/service-appointment-create-form";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
interface PageProps {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) return notFound();
  return (
    <Shell>
      <PageHeader id="appointment-create-header">
        <PageHeaderHeading
          as="h2"
          size="xs"
          className="flex items-center gap-1"
        >
          Create Appointment
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Create appointment
        </PageHeaderDescription>
      </PageHeader>
      <ServiceAppointmentCreateForm work_order={work_order} />
    </Shell>
  );
}
