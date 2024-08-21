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
import { RouterOutput } from "@/trpc/client";
import { DataTableFilterField } from "@/types";
import { useSearchParams } from "next/navigation";
import { getColumns } from "./assigned-resource-columns";
import { DataTableToolbar } from "./data-table-toolbar";

interface AssignedResourceTableProps {
  data: NonNullable<
    RouterOutput["db"]["assigned_resource"]["get"]["byWorkOrder"]["data"]
  >;
  rowCount: number;
}

export function AssignedResourceTable({
  data,
  rowCount,
}: AssignedResourceTableProps) {
  const searchParams = useSearchParams();

  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<
    AssignedResourceTableProps["data"][number]
  >[] = [
    {
      label: "Location",
      value: "user.email",
      options: data
        .flatMap((assigned_ressource) => assigned_ressource.user)
        .map((user) => ({
          label: user?.email || "",
          value: user?.email || "",
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
