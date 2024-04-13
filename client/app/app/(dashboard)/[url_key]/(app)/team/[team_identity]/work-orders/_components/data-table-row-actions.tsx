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
import { ZGetInspectionSchema } from "@/trpc/routes/template/inspection/get.schema";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
import { trpc } from "@/trpc/server";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<
    NonNullable<
      Awaited<
        ReturnType<(typeof trpc)["db"]["work_order"]["get"]["byId"]["query"]>
      >["data"]
    >
  >;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const inspection = ZGetInspectionSchema.pick({
    created_at: true,
    description: true,
    id: true,
    name: true,
    team_id: true,
    updated_at: true,
  }).parse(row.original);
  const utils = api.useUtils();

  // api.db.template.step.upsert.useMutation({
  //   onMutate: async (newData) => {
  //     await utils.db.template.step.getStepsByInspection.cancel({
  //       inspection_template_id,
  //     });
  //     const oldData = utils.db.template.step.getStepsByInspection.getData({
  //       inspection_template_id,
  //     });
  //     utils.db.template.step.getStepsByInspection.setData(
  //       { inspection_template_id },
  //       newData,
  //     );
  //     return { oldData };
  //   },
  //   onSuccess() {
  //     toast.success("Step updated successfully");
  //   },
  //   onError: (err, variables, ctx) => {
  //     catchError(new Error(err.message));
  //     utils.db.template.step.getStepsByInspection.setData(
  //       { inspection_template_id },
  //       ctx?.oldData,
  //     );
  //   },
  //   onSettled: () => {
  //     utils.db.template.inspection.get.withSteps.invalidate({
  //       id: inspection_template_id,
  //     });
  //   },
  // });

  const { mutate: remove } = api.db.work_order.delete.useMutation({
    onSuccess: async (data) => {
      toast.success("Inspection deleted successfully!");
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
        <DropdownMenuItem onClick={() => remove({ id: [inspection.id] })}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
