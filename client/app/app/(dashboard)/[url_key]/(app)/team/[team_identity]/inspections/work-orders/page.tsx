import { Shell } from "@/components/shells";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import WorkOrderTable from "./_components/work-order-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    team_identity: string;
  };
}

export default function Page({ searchParams, params }: PageProps) {
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  return (
    <Shell>
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Work Orders
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage your work orders
        </PageHeaderDescription>
      </PageHeader>

      <Shell variant={"dashboard"}>
        <Suspense fallback={<TableSkeleton />}>
          <WorkOrderTable searchParams={{ limit, page }} params={params} />
        </Suspense>
      </Shell>
    </Shell>
  );
}
