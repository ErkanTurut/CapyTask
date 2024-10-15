"use client";

import { DataTableColumnHeader } from "@/components/tables/general/data-table-column-header";
import { Button, buttonVariants } from "@gembuddy/ui/button";
import { Checkbox } from "@gembuddy/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableRowActions } from "./DataTableRowActions";

import { RouterOutput } from "@gembuddy/trpc/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<
  NonNullable<
    RouterOutput["db"]["location"]["get"]["byWorkspace"]["data"]
  >[number]
>[] = [
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
        <Link
          href={{ pathname: `locations/${row.original.id}` }}
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "underline",
          )}
        >
          {row.original.name}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
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
  {
    id: "actions",
    header: ({ column, table }) => {
      return (
        (table.getIsSomePageRowsSelected() ||
          table.getIsAllPageRowsSelected()) && (
          <Button
            variant="ghost"
            className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )
      );
    },
    cell: ({ row, table }) => {
      return <DataTableRowActions row={row} table={table} />;
    },
  },
];
