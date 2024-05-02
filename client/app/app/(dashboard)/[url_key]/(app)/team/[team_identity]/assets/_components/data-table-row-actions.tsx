"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Table } from "@tanstack/react-table";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { api } from "@/trpc/client";
import { ZGetWorkOrderSchema } from "@/trpc/routes/work_order/get.schema";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { Database } from "@/types/supabase.types";

interface DataTableRowActionsProps<TData> {
  row: Row<Database["public"]["Tables"]["asset"]["Row"]>;
  table: Table<Database["public"]["Tables"]["asset"]["Row"]>;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const work_order = row.original;
  const utils = api.useUtils();

  const { mutate: remove } = api.db.work_order.delete.useMutation({
    onSuccess: async (data) => {
      toast.success("Work order deleted successfully!");
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
    onSettled: async () => {
      await utils.db.work_order.get.invalidate();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => remove({ id: [work_order.id] })}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
