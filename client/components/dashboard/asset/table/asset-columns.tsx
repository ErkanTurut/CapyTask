"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { RouterOutput } from "@/trpc/client";
import { DataTableColumnHeader } from "@/components/tables/data-table/data-table-column-header";

export function getColumns(): ColumnDef<
  NonNullable<
    RouterOutput["db"]["work_order"]["get"]["detail"]
  >["asset"][number]
>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label}</Badge>} */}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.original.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex">
            <span className="max-w-[21.25rem] truncate">
              {row.original.description}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      id: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[16.25rem] truncate font-medium">
              {row.original.status}
            </span>
          </div>
        );
      },
    },
  ];
}
