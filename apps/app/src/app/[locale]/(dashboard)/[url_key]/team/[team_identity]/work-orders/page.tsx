import { Shell } from "@/components/shells";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import TableContainer from "@/components/tables/work-order/TableContainer";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { Separator } from "@gembuddy/ui/separator";
interface PageProps {
  // searchParams: { [key: string]: string | string[] | undefined };
  searchParams: {
    limit: string;
    page: string;
  };
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
      <Separator />

      <Suspense fallback={<TableSkeleton />}>
        <TableContainer params={params} searchParams={searchParams} />
      </Suspense>
    </Shell>
  );
}
