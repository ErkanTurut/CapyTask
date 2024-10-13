import { Shell } from "@/components/shells";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";

import { WorkOrderHeader } from "@/components/dashboard/work-order/work-order-header";
import { WorkOrderMain } from "@/components/dashboard/work-order/work-order-main";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import { ScrollArea } from "@gembuddy/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const work_order = await trpc.db.work_order.get.byId({
    id: params.work_order_id,
  });

  if (!work_order || !work_order.data) {
    return notFound();
  }
  return (
    <div className="grid h-full w-full lg:grid-cols-[1fr,0.4fr]">
      <ScrollArea className="h-full">
        <WorkOrderHeader initial_work_order={work_order} />
        <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
      </ScrollArea>
      <div className="hidden h-full border-l lg:block">
        <WorkOrderMain work_order={work_order.data} params={params} />
      </div>
    </div>
  );
}
