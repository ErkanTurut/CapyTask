"use client";
import {
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

import {
  TabsContainer,
  TabsLink,
} from "@/components/dashboard/navigation/tabs-link";
import { type Page, workOrderPagesConfig } from "./config";

export function WorkOrderTabs({ className }: { className?: string }) {
  const params = useParams() as {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
  const selectedSegment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();

  if (!params) {
    return null;
  }

  return (
    <TabsContainer className={className}>
      {workOrderPagesConfig.map(({ title, segment, href, disabled }) => {
        const active = segment === selectedSegment;
        return (
          <TabsLink
            key={title}
            active={active}
            href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}${href}`}
            prefetch={false}
            disabled={disabled}
          >
            {title}
          </TabsLink>
        );
      })}
    </TabsContainer>
  );
}

// <TabsContainer>
// <TabsLink
//   href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
//   active
// >
//   Details
// </TabsLink>
// <TabsLink
//   href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
// >
//   Details
// </TabsLink>
// <TabsLink
//   href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}`}
// >
//   Details
// </TabsLink>
// </TabsContainer>
