import { Shell } from "@/components/shells";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";

import { WorkOrderHeader } from "@/components/dashboard/work-order/work-order-header";
import { WorkOrderMain } from "@/components/dashboard/work-order/work-order-main";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_order_id: string;
  }>;
}

export default async function Layout(props: LayoutProps) {
  const params = await props.params;

  const { children } = props;

  const work_order = await trpc.db.work_order.get.byId({
    id: params.work_order_id,
  });

  if (!work_order || !work_order.data) {
    return notFound();
  }
  return (
    <div className="grid h-full w-full lg:grid-cols-[1fr,0.4fr]">
      <ScrollArea className="h-full">
        <WorkOrderHeader workOrder={work_order} />
        <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
      </ScrollArea>
      <div className="hidden h-full border-l lg:block">
        <WorkOrderMain work_order={work_order.data} params={params} />
      </div>
    </div>
  );
}
