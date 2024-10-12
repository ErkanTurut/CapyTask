"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Table } from "@tanstack/react-table";

import { Button } from "@gembuddy/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@gembuddy/ui/dropdown-menu";
import { api, RouterOutput } from "@/trpc/client";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { Database } from "@gembuddy/supabase/types";
import { useParams } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<
    NonNullable<
      RouterOutput["db"]["work_plan_template"]["get"]["byWorkspace"]["data"]
    >[number]
  >;
  table: Table<
    NonNullable<
      RouterOutput["db"]["work_plan_template"]["get"]["byWorkspace"]["data"]
    >[number]
  >;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const asset = row.original;
  const utils = api.useUtils();
  const params = useParams<{ team_identity: string }>();

  const { mutate: remove } = api.db.asset.delete.useMutation({
    onSuccess: async () => {
      toast.success("Asset deleted successfully!");
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
    onSettled: async () => {
      await utils.db.asset.get.invalidate();
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
        {/* <DropdownMenuItem
          onClick={() => remove({ asset_id: [asset.id], team_id: team.id })}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
