"use client";
import { DataTable } from "@/components/tables/general/data-table";
import { api } from "@gembuddy/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    team_identity: string;
  };
  initialData: NonNullable<
    Awaited<ReturnType<(typeof trpc)["db"]["asset"]["get"]["byTeam"]>>
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
  const queryResult = api.db.asset.get.byTeam.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        from: (searchParams.page - 1) * searchParams.limit,
        to: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData }
  );
  return (
    <DataTable
      filter={{ columnVisibility: { description: false } }}
      columns={columns}
      data={{
        data: queryResult.data.data || [],
        count: queryResult.data.count || 0,
      }}
      queryResult={queryResult}
      searchParams={searchParams}
    />
  );
}
