"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { RouterOutput } from "@/trpc/client";
import { statuses } from "./asset-table";

export function getColumns(): ColumnDef<
  RouterOutput["db"]["work_order"]["get"]["detail"]["asset"][number]
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
        return <DataTableColumnHeader column={column} title="Title" />;
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
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status"),
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex max-w-[6.25rem] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Description" />;
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[21.25rem] truncate font-medium">
              {row.original.description}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Created at" />;
      },
      cell: ({ row }) => {
        return new Date(row.original.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
        });
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Updated at" />;
      },
      cell: ({ row }) => {
        return new Date(row.original.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
        });
      },
    },
  ];
}
