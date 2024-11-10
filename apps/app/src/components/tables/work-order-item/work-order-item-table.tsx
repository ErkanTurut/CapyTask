"use client";

import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import type { Database } from "@gembuddy/supabase/types";
import { type RouterOutput, api } from "@gembuddy/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
// import { DataTable } from "@/components/tables/data-table/data-table";
import { DataTable } from "@gembuddy/ui/table/data-table";
import type { DataTableFilterField } from "@gembuddy/ui/types";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { DataTableToolbar } from "./data-table-toolbar";
import { getColumns } from "./work-order-item-columns";

interface WorkOrderItemTableProps {
  asyncWorkOrderItemQuery: ReturnType<
    typeof trpc.db.work_order_item.get.byWorkOrder
  >;
  work_order_id: string;
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

export function WorkOrderItemTable({
  asyncWorkOrderItemQuery,
  work_order_id,
}: WorkOrderItemTableProps) {
  const {
    data: { data: workOrderItem, count: rowCount },
  } = api.db.work_order_item.get.byWorkOrder.useQuery(
    {
      work_order_id: work_order_id,
    },
    {
      initialData: React.use(asyncWorkOrderItemQuery),
    },
  );

  if (!workOrderItem || !rowCount) {
    return null;
  }

  const searchParams = useSearchParams();
  const columns = React.useMemo(() => getColumns(), []);
  const filterFields: DataTableFilterField<
    NonNullable<
      RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"]
    >[number]
  >[] = [
    {
      label: "Status",
      value: "status",
      options: statuses,
    },
  ];
  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  // Create query string
  const createQueryString = React.useCallback(
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

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
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

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      location_type: false,
    });
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: workOrderItem,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFromLeafRows: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  );
}
