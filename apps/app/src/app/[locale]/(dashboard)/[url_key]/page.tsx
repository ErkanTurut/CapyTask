import { ServiceAppointmentList } from "@/components/dashboard/service-appointment/service-appointment-list";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";

import { trpc } from "@gembuddy/trpc/server";
import { Icons } from "@gembuddy/ui/icons";
import { endOfWeek, startOfWeek } from "date-fns";

type PageProps = {
  params: Promise<{
    url_key: string;
  }>;
};

export default function Page(props: PageProps) {
  const serviceAppointmentQuery =
    trpc.db.service_appointment.get.byServiceResource({
      date_range: {
        from: startOfWeek(new Date()).toISOString(),
        to: endOfWeek(new Date()).toISOString(),
      },
      service_resource_id: ["3ef743fc-5173-4239-a6d3-a68dfc0276b3"],
    });
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Service Appointments</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage your service appointments
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
