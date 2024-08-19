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
import { RouterOutput } from "@/trpc/server/trpc";
import { StatusSelector } from "@/components/status-selector";
import { PrioritySelector } from "@/components/priority-selector";

interface WorkOrderHeaderProps {
  work_order: NonNullable<RouterOutput["db"]["work_order"]["get"]["detail"]>;
}

export default async function WorkOrderHeader({
  work_order,
}: WorkOrderHeaderProps) {
  return (
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
        <StatusSelector status={work_order.status} />
        <PrioritySelector status={work_order.priority} />
      </section>

      <WorkOrderTabs />
    </div>
  );
}
