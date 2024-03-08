import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/table/data-table";

import { Shell } from "@/components/shells";
import { getPlansByIdentity } from "@/lib/service/plan/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  const offset = (page - 1) * limit;

  return (
    <>
      <PageHeader
        className="pt-10"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Your Plans
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of your inspection Plans
        </PageHeaderDescription>
      </PageHeader>
      <Shell variant="dashboard">
        <Suspense fallback={<TableSkeleton />}>
          {(async () => {
            const { data: plans, count } = await getPlansByIdentity({
              team_identity: params.team_identity,
              db: supabase,
              range: { start: offset, end: offset + limit * 2 },
            });

            return (
              <DataTable
                columns={columns}
                count={count || 0}
                data={plans || []}
              />
            );
          })()}
        </Suspense>
      </Shell>
    </>
  );
}
