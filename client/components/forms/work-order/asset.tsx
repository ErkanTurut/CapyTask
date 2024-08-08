"use client";

import { useFieldArray } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";

import type { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { ModalSearchCommand } from "@/components/modal-search-command";
import { CommandItem } from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { api, RouterOutput } from "@/trpc/client";
import { Button } from "@/components/ui/button";

export function WorkOrderAsset({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  const { append, remove } = useFieldArray({
    control: form.control,
    name: "asset",
    keyName: "fieldId",
  });
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [assets, setAssets] = useState<
    RouterOutput["db"]["asset"]["get"]["textSearch"]
  >([]);

  const { data, isPending } = api.db.asset.get.textSearch.useQuery({
    query: inputValue,
  });

  return (
    <div className="flex flex-col items-center gap-4 p-2">
      <Button
        type="button"
        className="h-9 w-full justify-start"
        variant={"outline"}
        onClick={(e) => setOpen(!open)}
      >
        <Icons.search className="mr-2 h-4 w-4" />
        Search for an asset
      </Button>
      <ModalSearchCommand
        setInputValue={setInputValue}
        open={open}
        isLoading={isPending}
        setOpen={setOpen}
      >
        {data?.map((asset, index) => (
          <CommandItem
            disabled={assets.some((a) => a.id === asset.id)}
            value={asset.name + asset.description}
            key={index}
            onSelect={() => {
              if (assets.some((a) => a.id === asset.id)) {
                return;
              }
              setAssets([...assets, asset]);
              append({ asset_id: asset.id });
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <span>{asset.name}</span>
          </CommandItem>
        ))}
      </ModalSearchCommand>
      {assets.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="table-cell">Title</TableHead>
              <TableHead className="table-cell">Location name</TableHead>
              <TableHead className="table-cell">Location type</TableHead>
              <TableHead className="table-cell"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="">{index + 1}</TableCell>
                  <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <div className="font-normal sm:font-medium">
                      {asset.name}
                    </div>
                  </TableCell>
                  <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <div className="font-normal sm:font-medium">
                      {asset.location?.name}
                    </div>
                  </TableCell>
                  <TableCell className="table-cell max-w-40 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <div className="font-normal sm:font-medium">
                      {asset.location?.location_type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      type="reset"
                      onClick={() => {
                        remove(index);
                        setAssets(assets.filter((_, i) => i !== index));
                      }}
                      variant={"ghost"}
                      size={"icon"}
                      className="border border-transparent text-muted-foreground transition-colors duration-300 hover:border-border hover:text-foreground"
                    >
                      <Icons.trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p className="p-6 text-center text-muted-foreground">
          No assets added yet
        </p>
      )}
    </div>
  );
}
