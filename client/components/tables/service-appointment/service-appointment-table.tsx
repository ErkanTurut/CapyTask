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
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/tables/data-table/data-table";
import { api, RouterOutput } from "@/trpc/client";
import { DataTableFilterField } from "@/types";
import { Database } from "@/types/supabase.types";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { DataTableToolbar } from "./data-table-toolbar";
import { getColumns } from "./service-appointment-columns";

interface ServiceAppointmentTableProps {
  initialData: NonNullable<
    RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]
  >;
  params: {
    work_order_id: string;
  };
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

export function ServiceAppointmentTable({
  initialData,
  params,
}: ServiceAppointmentTableProps) {
  const {
    data: { data, count: rowCount },
  } = api.db.service_appointment.get.byWorkOrder.useQuery(
    {
      work_order_id: params.work_order_id,
    },
    { initialData },
  );

  const searchParams = useSearchParams();

  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<
    ServiceAppointmentTableProps["initialData"]["data"][number]
  >[] = [
    {
      label: "Status",
      value: "id",
      options: statuses,
    },
    {
      label: "Start Date",
      value: "start_date",
      options: data
        .flatMap((service_appointment) => service_appointment.start_date)
        .map((start_date) => ({
          label: start_date || "",
          value: start_date || "",
        })),
    },

    {
      label: "End Date",
      value: "end_date",
      options: data
        .flatMap((service_appointment) => service_appointment.end_date)
        .map((end_date) => ({
          label: end_date || "",
          value: end_date || "",
        })),
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
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount: rowCount ?? 0,
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
