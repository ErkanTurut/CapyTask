import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";

import WorkOrderMain from "@/components/dashboard/work-order/work-order-main";
import { WorkOrderTabs } from "@/components/dashboard/work-order/work-order-tabs";
import { Database } from "@/types/supabase.types";
import { Icons, IconType } from "@/components/icons";
import { statusConfig } from "@/config/dashboard.config";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
}

const StatusSelect = ({
  status,
}: {
  status: Database["public"]["Enums"]["Status"];
}) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
      <Icons.pulse colorValue={"red"} />
      {statusConfig.find((_status) => _status.value === status)?.label}
      <Icons.caretSort className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
    </div>
  );
};

export default async function Layout({ children, params }: LayoutProps) {
  const work_order = await trpc.db.work_order.get.detail({
    id: params.work_order_id,
  });

  if (!work_order) {
    return notFound();
  }

  return (
    <Shell>
      <div className="grid gap-4 border-b sm:grid-cols-2">
        <PageHeader
          id="work-order-header"
          aria-labelledby="work-order-header-heading"
          as="header"
        >
          <PageHeaderHeading size="xs">{work_order.name}</PageHeaderHeading>
          <PageHeaderDescription size="xs">
            {work_order.description}
          </PageHeaderDescription>
        </PageHeader>
        <section className="flex items-center gap-2 rounded-sm">
          <StatusSelect status={work_order.status} />
          <div className="inline-flex items-center gap-2 rounded-full border bg-opacity-65 px-2.5 py-1 text-xs font-semibold transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {work_order.priority}
          </div>
        </section>

        <WorkOrderTabs />
      </div>
      <div className="grid h-full gap-4 sm:grid-cols-[1fr,0.4fr]">
        <div className="flex h-full flex-col gap-2 rounded-md">{children}</div>
        <div>
          <WorkOrderMain work_order={work_order} params={params} />
        </div>
      </div>
    </Shell>
  );
}
