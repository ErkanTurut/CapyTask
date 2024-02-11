import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { columns } from "@/components/plan/table/columns";
import { DataTable } from "@/components/plan/table/data-table";

import { Shell } from "@/components/shells";
import { getPlans } from "@/lib/service/plan/fetch";
import { getTeamByIdentity } from "@/lib/service/team/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  const { data: team } = await getTeamByIdentity({
    identity: params.team_identity,
    supabase,
  });
  if (!team) return redirect("/404");

  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  const offset = (page - 1) * limit;

  const {
    data: plans,
    error,
    count,
  } = await getPlans({
    team_id: team.id,
    client: supabase,
    range: { start: offset, end: offset + limit * 2 },
  });

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
        <DataTable columns={columns} count={count || 0} data={plans || []} />
      </Shell>
    </>
  );
}
