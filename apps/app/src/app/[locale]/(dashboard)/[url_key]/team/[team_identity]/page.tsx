import TechnicianDashboard from "@/components/dashboard/service-appointment/techician/technician-dashboard";
import { Shell } from "@/components/shells";
import { trpc } from "@gembuddy/trpc/server";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@gembuddy/ui/page-header";
import { ScrollArea } from "@gembuddy/ui/scroll-area";

interface PageProps {
  params: {
    locale: string;
    url_key: string;
    team_identity: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data: currentUser } = await trpc.db.user.get.currentUser();

  if (!currentUser) {
    return null;
  }

  const { data: serviceAppointment } =
    await trpc.db.service_appointment.get.byUser({
      user_id: currentUser.id,
    });

  console.log(serviceAppointment);

  return (
    <div className="grid h-full w-full lg:grid-cols-[1fr,0.4fr]">
      <ScrollArea className="h-full">
        <PageHeader
          id="work-order-header"
          aria-labelledby="work-order-header-heading"
          as="header"
          className=" border-b bg-background p-3  "
        >
          <PageHeaderHeading>Hi {currentUser.first_name}!</PageHeaderHeading>
          <PageHeaderDescription>
            Welcome to your dashboard
          </PageHeaderDescription>
        </PageHeader>
        <Shell>
          <TechnicianDashboard />
        </Shell>
      </ScrollArea>
      <div>test</div>
    </div>
  );
}
