"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { catchError, cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  TCreateStepSchema,
  ZCreateStepSchema,
} from "@/trpc/routes/template/step/create.schema";
import { api } from "@/trpc/client";
import { useRouter } from "next/navigation";
interface StepCreateProps extends React.HTMLAttributes<HTMLFormElement> {
  inspection_template_id: string;
}

const CreateStepForm: FC<StepCreateProps> = ({
  inspection_template_id,
  className,
}) => {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate, isPending } = api.db.template.step.create.useMutation({
    onSuccess(data) {
      toast.success("Team created successfully");
      form.reset({
        description: "",
        name: "",
        order: undefined,
        parent_id: undefined,
        inspection_template_id,
      });
    },
    onError(err) {
      catchError(new Error(err.message));
    },
    onSettled() {
      utils.db.template.step.getStepsByInspection.invalidate({
        inspection_template_id: inspection_template_id,
      });
    },
  });

  // react-hook-form
  const form = useForm<TCreateStepSchema>({
    resolver: zodResolver(ZCreateStepSchema),
    defaultValues: {
      description: "",
      name: "",
      order: undefined,
      parent_id: undefined,
      inspection_template_id,
    },
  });

  async function onSubmit(data: TCreateStepSchema) {
    mutate(data);
  }
  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Step name</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Step description</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isPending}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateStepForm;
