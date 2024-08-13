import { Shell } from "@/components/shells";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import TableContainer from "@/components/dashboard/work-order/tables/table/TableContainer";
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

      <Shell variant={"bento"}>
        <Suspense fallback={<TableSkeleton />}>
          <TableContainer params={params} searchParams={{ limit, page }} />
        </Suspense>
      </Shell>
    </Shell>
  );
}
