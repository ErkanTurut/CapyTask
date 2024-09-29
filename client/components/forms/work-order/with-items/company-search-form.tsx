"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Icons } from "@/components/icons";
import { ModalSearchCommand } from "@/components/modal-search-command";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { api, RouterOutput } from "@/trpc/client";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface companySearchFormProps {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}

export default function CompanySearchForm({ form }: companySearchFormProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<
    RouterOutput["db"]["company"]["get"]["textSearch"][0] | null
  >(null);

  const { data, isPending } = api.db.company.get.textSearch.useQuery({
    query: inputValue,
  });

  return (
    <FormField
      control={form.control}
      name="company_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Select Company
            <br />
          </FormLabel>

          <FormControl>
            <>
              <Button
                type="button"
                variant={"outline"}
                onClick={(e) => setOpen(!open)}
              >
                {selected ? (
                  <>
                    <Icons.checkCircled className="mr-2 h-4 w-4" />
                    {selected.name}
                  </>
                ) : (
                  <>
                    <Icons.search className="mr-2 h-4 w-4" />
                    Search for a company
                  </>
                )}
              </Button>
              <ModalSearchCommand
                setInputValue={setInputValue}
                open={open}
                isLoading={isPending}
                setOpen={setOpen}
              >
                {data?.map((company, index) => (
                  <CommandItem
                    value={company.name + company.description}
                    key={index}
                    onSelect={() => {
                      setSelected(company);
                      field.onChange(company.id);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {selected?.id === company.id ? (
                      <Icons.checkCircled className="mr-2 h-4 w-4" />
                    ) : null}
                    <span>{company.name}</span>
                  </CommandItem>
                ))}
              </ModalSearchCommand>
            </>
          </FormControl>
          <FormDescription>
            Select the company that this work order is associated with.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
