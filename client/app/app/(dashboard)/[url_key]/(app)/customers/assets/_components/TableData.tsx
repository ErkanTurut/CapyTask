"use client";
import { DataTable } from "@/components/table/data-table";
import { api } from "@/trpc/client";
import type { trpc } from "@/trpc/server";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    url_key: string;
  };
  initialData: NonNullable<
    Awaited<ReturnType<(typeof trpc)["db"]["asset"]["get"]["byWorkspace"]>>
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
  } = api.db.asset.get.byWorkspace.useQuery(
    {
      url_key: params.url_key,
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
