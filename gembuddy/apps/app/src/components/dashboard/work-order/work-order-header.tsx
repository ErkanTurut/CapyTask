"use client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { WorkOrderTabs } from "@/components/dashboard/work-order/work-order-tabs";
import { RouterOutput } from "@gembuddy/trpc/server/trpc";
import { PrioritySelector } from "./priority-selector";
import { StatusSelector } from "./status-selector";
import { api } from "@/trpc/client";

interface WorkOrderHeaderProps {
  initial_work_order: NonNullable<
    RouterOutput["db"]["work_order"]["get"]["byId"]
  >;
}

export function WorkOrderHeader({ initial_work_order }: WorkOrderHeaderProps) {
  const { data: work_order } = api.db.work_order.get.byId.useQuery(
    {
      id: initial_work_order.id,
    },
    {
      initialData: initial_work_order,
    }
  );

  return (
    <div className="grid gap-4 border-b bg-background p-6 pb-0 sm:grid-cols-2">
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
      <WorkOrderTabs className="col-span-full" />
    </div>
  );
}
