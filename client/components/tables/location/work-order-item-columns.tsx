"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  AccessorColumnDef,
  RowData,
  ColumnDefBase,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { RouterOutput } from "@/trpc/client";
import { Leaves } from "@/types";

interface ColumnType<TData extends RowData, TValue = unknown>
  extends Omit<ColumnDef<TData, TValue>, "accessoryKey"> {
  accessorKey: (string & {}) | Leaves<TData>;
}

export function getColumns(): ColumnType<
  NonNullable<
    RouterOutput["db"]["location"]["get"]["byWorkOrder"]["data"]
  >[number]
>[] {
  return [
    {
      id: "select",
      accessorKey: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Location" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[11.25rem] truncate font-medium">
              {row.original.name}
            </span>
          </div>
        );
      },
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value.includes(row.original.name);
      },
    },
    {
      accessorKey: "address.city",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="City" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[21.25rem] truncate font-medium">
              {row.original.address?.city}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "address.street",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Street" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.address?.street}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "address.postal_code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Zip code" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[8.25rem] truncate">
              {row.original.address?.postal_code}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.original.location?.location_type);
      },
    },
  ];
}
