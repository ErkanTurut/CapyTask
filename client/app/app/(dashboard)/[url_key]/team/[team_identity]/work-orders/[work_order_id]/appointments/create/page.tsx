import { ServiceAppointmentCreateForm } from "@/components/forms/service-appointment/old/service-appointment-create-form";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import WeekCalendar from "@/components/calendar/week-calendar";
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
      {/* <WeekCalendar
        initialTimeFormat="24h"
        events={[
          {
            start: new Date("2024-09-10T12:30:00"),
            end: new Date("2024-09-10T14:30:00"),
            title: "Test",
            color: "blue",
            id: "1",
          },
          {
            start: new Date("2024-09-10T12:00:00"),
            end: new Date("2024-09-10T14:30:00"),
            title: "Test 2",
            color: "pink",
            id: "1",
          },
          {
            start: new Date("2024-09-23T12:00:00"),
            end: new Date("2024-09-23T14:30:00"),
            title: "Test 2",
            color: "pink",
            id: "1",
          },
        ]}
        disabledTimeRanges={[
          {
            start: new Date("2024-09-10T00:00:00"),
            end: new Date("2024-09-10T07:00:00"),
          },
        ]}
        startDate={new Date()}
      /> */}
      {/* <PageHeader id="appointment-create-header">
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
      </PageHeader> */}
      <ServiceAppointmentCreateForm work_order={work_order} />
    </Shell>
  );
}
