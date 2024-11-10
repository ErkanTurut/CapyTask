import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Shell } from "@/components/shells";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Suspense } from "react";
import { TableContainer } from "./_components/table/TableContainer";

interface DashboardLayoutProps {
  params: Promise<{
    url_key: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage(props: DashboardLayoutProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const page = Number.parseInt(searchParams.page?.toString() ?? "1");
  const limit = searchParams.limit
    ? Number.parseInt(searchParams.limit as string)
    : 10;

  return (
    <Shell>
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
          <TableContainer searchParams={{ limit, page }} params={params} />
        </Suspense>
      </Shell>
    </Shell>
  );
}
