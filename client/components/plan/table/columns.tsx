"use client";

import { Database } from "@/types/supabase.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export interface tableProps {
  columns: Database["public"]["Tables"]["plan"]["Row"][];
}

export const columns: ColumnDef<Database["public"]["Tables"]["plan"]["Row"]>[] =
  [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Title" />;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
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
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
