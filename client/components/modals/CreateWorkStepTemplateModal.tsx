"use client";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { useParams, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { catchError } from "@/lib/utils";
import { toast } from "sonner";

import { api } from "@/trpc/client";
import {
  TCreateWorkStepTemplateSchema,
  ZCreateWorkStepTemplateSchema,
} from "@/trpc/server/routes/work_step_template/create.schema";

export function CreatWorkStepTemplateModal() {
  const router = useRouter();
  const { work_plan_template_id } = useParams() as {
    work_plan_template_id: string;
  };

  const utils = api.useUtils();
  console.log(work_plan_template_id);

  const form = useForm<TCreateWorkStepTemplateSchema>({
    resolver: zodResolver(ZCreateWorkStepTemplateSchema),
    values: {
      name: "",
      description: "",
      work_plan_template_id,
    },
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isPending, mutate } = api.db.work_step_template.create.useMutation({
    onSuccess: async (data, variables) => {
      toast.success("Updated successfully");
      form.reset(variables);
    },
    onError: (err, data, ctx) => {
      catchError(new Error(err.message));
    },
    onSettled: () => {
      utils.db.work_step_template.get.byWorkPlanTemplate.invalidate({
        work_plan_template_id,
      });
      router.back();
    },
  });

  return (
    <Dialog onOpenChange={() => router.back()} open>
      <DialogContent className="flex h-[28rem] flex-col justify-start p-0 pt-4 sm:max-w-[625px]">
        <Form {...form}>
          <form
            className="flex flex-1 flex-col gap-2"
            onSubmit={(...args) =>
              void form.handleSubmit((data) => {
                mutate(data);
              })(...args)
            }
          >
            {/* <div className="flex flex-1 flex-col justify-start gap-2 overflow-y-auto">
              <FormField
                control={form.control}
                name="name"
                
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Add title..."
                        className="border-none p-2 text-lg font-semibold leading-none tracking-tight shadow-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <div className="flex w-full flex-1 overflow-y-auto">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="And add description..."
                          className="min-h-full resize-none border-none p-2 shadow-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="p-2">
                  <FormControl>
                    <Input
                      placeholder="Add title..."
                      className="border-none text-lg font-semibold leading-none tracking-tight shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4 h-full p-2">
                  <FormControl>
                    <Textarea
                      placeholder="And add description..."
                      className="h-full resize-none border-none shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <DialogFooter className="mr border-t p-2">
              <Button
                disabled={!form.formState.isDirty}
                isLoading={isPending}
                type="submit"
              >
                Create step
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
