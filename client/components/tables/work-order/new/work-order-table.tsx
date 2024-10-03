"use client";

import {
  type ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { use, type ComponentType, useMemo, useCallback, useState } from "react";

import { DataTable } from "@/components/tables/data-table/data-table";
import { api, RouterOutput } from "@/trpc/client";
import { Database } from "@/types/supabase.types";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { DataTableToolbar } from "./data-table-toolbar";
import { getColumns } from "./work-order-columns";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DataTableFilterField } from "@/types";
import { trpc } from "@/trpc/server";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { Button } from "@/components/ui/button";

interface WorkOrderTableProps {
  initialData: NonNullable<
    ReturnType<(typeof trpc)["db"]["work_order"]["get"]["byTeamIdentity"]>
  >;
}

export const statuses: {
  value: Database["public"]["Enums"]["Status"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}[] = [
  {
    value: "OPEN",
    label: "Open",
    icon: QuestionMarkCircledIcon,
    withCount: true,
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
    icon: CircleIcon,
    withCount: true,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
    withCount: true,
  },
  {
    value: "COMPLETED",
    label: "Done",
    icon: CheckCircledIcon,
    withCount: true,
  },
  {
    value: "CANCELED",
    label: "Cancelled",
    icon: CrossCircledIcon,
    withCount: true,
  },
];

export function WorkOrderTable({ initialData }: WorkOrderTableProps) {
  const params = useParams() as { team_identity: string };
  const searchParams = useSearchParams();

  const columns = useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<
    Awaited<WorkOrderTableProps["initialData"]>["data"][number]
  >[] = [
    {
      label: "Status",
      value: "status",
      options: statuses,
    },
    // {
    //   label: "Location",
    //   value: "location_id",
    //   options: data
    //     .flatMap((work_order_item) => work_order_item.location)
    //     .map((location) => ({
    //       label: location?.name || "",
    //       value: location?.id || "",
    //     })),
    // },
  ];

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key,
        );
        const searchableColumn = searchableColumns.find(
          (column) => column.value === key,
        );

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value.split("."),
          });
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value],
          });
        }

        return filters;
      },
      [],
    );
  }, [filterableColumns, searchableColumns, searchParams]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    location_type: false,
  });
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);
  const [sorting, setSorting] = useState<SortingState>([]);

  const queryResult = api.db.work_order.get.byTeamIdentity.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        start: 0,
        end: 10,
      },
    },
    {
      initialData: use(initialData),
      refetchOnMount: false,
      staleTime: 1000 * 60,
    },
  );

  const { table } = useDataTable({
    data: queryResult.data.data || [],
    columns,
    filterFields,
    rowCount: queryResult.data.count || 0,

    /* optional props */
    enableAdvancedFilter: true,
    initialState: {},
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <Button size={"sm"}>Create</Button>
      </DataTableToolbar>
    </DataTable>
  );
}
