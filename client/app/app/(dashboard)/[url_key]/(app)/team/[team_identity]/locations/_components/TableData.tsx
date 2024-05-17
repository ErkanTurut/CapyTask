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
  const {
    data: { data, count },
  } = api.db.asset.get.byTeam.useQuery(
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
      filter={{ columnVisibility: { description: false } }}
      columns={columns}
      data={data}
      count={count || 0}
      searchParams={searchParams}
    />
  );
}
