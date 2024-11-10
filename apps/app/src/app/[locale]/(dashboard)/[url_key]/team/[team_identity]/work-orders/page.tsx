import { Shell } from "@/components/shells";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import TableContainer from "@/components/tables/work-order/TableContainer";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { Separator } from "@gembuddy/ui/separator";
import { Suspense } from "react";
interface PageProps {
  // searchParams: { [key: string]: string | string[] | undefined };
  searchParams: Promise<{
    limit: string;
    page: string;
  }>;
  params: Promise<{
    team_identity: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
