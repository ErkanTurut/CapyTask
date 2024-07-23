"use client";
import { DataTable } from "@/components/table/data-table";
import { api, RouterInput, RouterOutput } from "@/trpc/client";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    team_identity: string;
  };
  initialData: NonNullable<
    RouterOutput["db"]["work_plan_template"]["get"]["byTeamId"]
  >;
  searchParams: {
    limit: number;
    page: number;
  };
}

export function TableData({
  params,
  searchParams,
  initialData,
}: AssetTableProps) {
  const queryResult = api.db.work_plan_template.get.byTeamId.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        start: (searchParams.page - 1) * searchParams.limit,
        end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData },
  );
  return (
    <DataTable
      // data={queryResult.data || { data: [], count: 0 }}
      filter={{ columnVisibility: { description: false } }}
      columns={columns}
      data={{
        data: queryResult.data.data || [],
        count: queryResult.data.count || 0,
      }}
      searchParams={searchParams}
      queryResult={queryResult}
    />
  );
}
