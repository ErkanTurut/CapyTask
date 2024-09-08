import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

import { WorkOrderHeader } from "@/components/dashboard/work-order/work-order-header";
import { WorkOrderMain } from "@/components/dashboard/work-order/work-order-main";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) {
    return notFound();
  }

  return (
    // <Shell>
    //   <div className="grid h-full w-full gap-6 lg:grid-cols-[1fr,0.4fr]">
    //     <div className="flex h-full w-full flex-col gap-8">
    //       <WorkOrderHeader work_order={work_order} />
    //       <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
    //     </div>
    //     <WorkOrderMain work_order={work_order} params={params} />
    //   </div>
    // </Shell>

    <div className="grid h-full w-full lg:grid-cols-[1fr,0.4fr]">
      <ScrollArea>
        <WorkOrderHeader work_order={work_order} />
        <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
      </ScrollArea>
      <div className="h-full border-l">
        <WorkOrderMain work_order={work_order} params={params} />
      </div>
    </div>
  );
}
