import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

import WorkOrderHeader from "@/components/dashboard/work-order/work-order-header";
import WorkOrderMain from "@/components/dashboard/work-order/work-order-main";

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
  console.log(work_order);

  return (
    <Shell>
      <div className="grid h-full gap-6 sm:grid-cols-[1fr,0.4fr]">
        <div className="flex h-full flex-col gap-8 rounded-md">
          <WorkOrderHeader work_order={work_order} />
          {children}
        </div>
        <div>
          <WorkOrderMain work_order={work_order} params={params} />
        </div>
      </div>
    </Shell>
  );
}
