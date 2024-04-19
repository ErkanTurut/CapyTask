import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Shell } from "@/components/shells";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import InspectionTemplateTable from "./_components/inspection-template-table";

interface DashboardLayoutProps {
  params: {
    team_identity: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardLayoutProps) {
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  const offset = (page - 1) * limit;

  return (
    <Shell variant="default">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Work Plans Templates
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of all work plans templates in your team.
        </PageHeaderDescription>
      </PageHeader>
      <Shell variant="bento">
        <Suspense fallback={<TableSkeleton />}>
          <InspectionTemplateTable
            props={{ offset, limit, page }}
            params={params}
          />
        </Suspense>
      </Shell>
    </Shell>
  );
}
