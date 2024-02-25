import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { columns } from "@/components/plan/table/columns";
import { DataTable } from "./_components/data-table";

import { Shell } from "@/components/shells";
import { getStepsByIdentity } from "@/lib/service/step/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

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

  const { data: steps, count } = await getStepsByIdentity({
    team_identity: params.team_identity,
    db: supabase,
    range: { start: offset, end: offset + limit * 2 },
  });

  return (
    <>
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Your Steps
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of your steps templates that you can use to create in your plans
        </PageHeaderDescription>
      </PageHeader>
      <Shell variant="dashboard">
        <DataTable columns={columns} count={count || 0} data={steps || []} />
      </Shell>
    </>
  );
}
