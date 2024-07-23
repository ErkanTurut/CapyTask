"use client";
import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/client";
import type { trpc } from "@/trpc/server";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    team_identity: string;
  };
  initialData: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_order"]["get"]["byTeamIdentity"]>
    >
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
  const queryResult = api.db.work_order.get.byTeamIdentity.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        start: (searchParams.page - 1) * searchParams.limit,
        end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData, refetchOnMount: false, staleTime: 1000 * 60 * 1 },
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
