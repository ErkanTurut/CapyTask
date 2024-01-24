"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Database } from "@/types/supabase.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { usePathname } from "next/navigation";

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
      cell: ({ row }) => {
        const pathname = usePathname();
        return (
          <Link
            href={`${pathname}/${row.original.id}`}
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
