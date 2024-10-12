"use client";
import { DataTable } from "@/components/tables/general/data-table";
import { api } from "@/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
import { columns } from "./columns";
import { use } from "react";
import { CreateWorkOrderSheet } from "@/components/sheets/create-work-order-sheet";
import { Button } from "@gembuddy/ui/button";
import { parseAsBoolean, useQueryState } from "nuqs";

interface AssetTableProps {
  params: {
    team_identity: string;
  };
  initialData: NonNullable<
    ReturnType<(typeof trpc)["db"]["work_order"]["get"]["byTeamIdentity"]>
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
  const [open, setOpen] = useQueryState("create", parseAsBoolean);
  const queryResult = api.db.work_order.get.byTeamIdentity.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        start: (searchParams.page - 1) * searchParams.limit,
        end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    {
      initialData: use(initialData),
      refetchOnMount: false,
      staleTime: 1000 * 60,
    }
  );
  return (
    <>
      <CreateWorkOrderSheet />
      <Button onClick={() => setOpen(true)}>test</Button>
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
    </>
  );
}
