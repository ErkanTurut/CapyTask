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
import { type Page, workOrderPagesConfig } from "@/config/pages";

export function WorkOrderTabs() {
  const params = useParams() as {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
  const selectedSegment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();
  console.log(segments);

  if (!params) {
    return null;
  }

  return (
    <TabsContainer>
      {workOrderPagesConfig.map(({ title, segment, href }) => {
        const active = segment === selectedSegment;
        console.log(selectedSegment);
        return (
          <TabsLink
            key={title}
            active={active}
            href={`/${params.url_key}/team/${params.team_identity}/work-orders/${params.work_order_id}${href}`}
            prefetch={false}
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
