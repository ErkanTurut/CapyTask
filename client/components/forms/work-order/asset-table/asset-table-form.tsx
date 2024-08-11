"use client";

import { DataTable } from "@/components/tables/custom/data-table";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useFieldArray, useFormContext } from "react-hook-form";
import { columns } from "./columns";

import { Icons } from "@/components/icons";
import { ModalSearchCommand } from "@/components/modal-search-command";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";
import { useState } from "react";

export function AssetTableForm({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useFormContext<TCreateWorkOrderWithItemsSchema>();

  const [rowSelection, setRowSelection] = useState({});

  const {
    append,
    remove,
    fields: assets,
    update,
  } = useFieldArray({
    control: form.control,
    name: "asset",
    keyName: "fieldId",
  });
  const table = useReactTable({
    data: assets,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const { data: assetResult, isPending } = api.db.asset.get.textSearch.useQuery(
    {
      query: inputValue,
    },
    { refetchOnMount: false },
  );

  return (
    <>
      <ModalSearchCommand
        setInputValue={setInputValue}
        open={open}
        isLoading={isPending}
        setOpen={setOpen}
      >
        {assetResult?.map((asset, index) => (
          <CommandItem
            disabled={assets.some((a) => a.id === asset.id)}
            value={asset.name + asset.description}
            key={index}
            onSelect={() => {
              if (assets.some((a) => a.id === asset.id)) {
                return;
              }
              append(asset);
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <span>{asset.name}</span>
          </CommandItem>
        ))}
      </ModalSearchCommand>
      <DataTable table={table}>
        <div
          className={cn(
            "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
            className,
          )}
          {...props}
        >
          <div className="flex flex-1 items-center space-x-2">
            <Button
              type="button"
              className="justify-start"
              variant={"outline"}
              onClick={(e) => setOpen(!open)}
            >
              <Icons.search className="mr-2 h-4 w-4" />
              Add new asset
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {table.getSelectedRowModel().rows.length > 0 && (
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  remove(
                    table.getSelectedRowModel().rows.map((row) => row.index),
                  );
                  table.toggleAllRowsSelected(false);
                }}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DataTable>
    </>
  );
}
