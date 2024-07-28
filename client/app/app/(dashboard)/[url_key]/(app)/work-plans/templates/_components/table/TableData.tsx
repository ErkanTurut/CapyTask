"use client";
import { DataTable } from "@/components/table/data-table";
import { api, RouterOutput } from "@/trpc/client";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    url_key: string;
  };
  initialData: NonNullable<
    RouterOutput["db"]["work_plan_template"]["get"]["byWorkspace"]
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
  const queryResult = api.db.work_plan_template.get.byWorkspace.useQuery(
    {
      url_key: params.url_key,
      range: {
        start: (searchParams.page - 1) * searchParams.limit,
        end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData, staleTime: 1000 * 60, refetchOnMount: true },
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
