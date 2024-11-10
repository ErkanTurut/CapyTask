"use client";
import { DataTable } from "@/components/tables/general/data-table";
import { api, RouterOutput } from "@gembuddy/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    url_key: string;
  };
  initialData: RouterOutput["db"]["company"]["get"]["byWorkspace"];

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
  const queryResult = api.db.company.get.byWorkspace.useQuery(
    {
      url_key: params.url_key,
      range: {
        from: (searchParams.page - 1) * searchParams.limit,
        to: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData, refetchOnMount: false, staleTime: 1000 * 60 },
  );
  return (
    <DataTable
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
