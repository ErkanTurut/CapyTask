import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useFormContext } from "react-hook-form";

interface AssetModalProps extends React.HTMLAttributes<HTMLDivElement> {
  assetIndex: number;
}

export function AssetModal({
  assetIndex,
  children,
  className,
}: AssetModalProps) {
  const form = useFormContext<TCreateWorkOrderWithItemsSchema>();

  const asset = form.getValues(`asset.${assetIndex}`);

  const {
    append: appendWorkStep,
    remove: removeWorkStep,
    fields: workSteps,
    update: updateWorkStep,
    move: moveWorkStep,
  } = useFieldArray({
    control: form.control,
    name: `asset.${assetIndex}.work_step`,
    keyName: "fieldId",
  });

  return (
    <Dialog>
      <DialogTrigger className={cn("", className)}>{children}</DialogTrigger>
      <DialogContent className="flex h-[525px] flex-col sm:max-w-[925px]">
        <div>
          <DialogTitle>{asset.name} </DialogTitle>
          <DialogDescription>{asset.description}</DialogDescription>
        </div>
        <div>{asset.location?.location_type}</div>
        <Separator />
        <Button
          type="button"
          onClick={() =>
            appendWorkStep({
              name: "",
              description: "",
              step_order: 0,
            })
          }
        >
          Add Work Step
        </Button>

        <div className="flex h-72 flex-col items-center gap-4 rounded-md border p-2">
          {workSteps.length === 0 && (
            <p className="my-auto text-center text-muted-foreground">
              No work steps added yet
            </p>
          )}
          <Sortable
            value={workSteps}
            onMove={({ activeIndex, overIndex }) =>
              moveWorkStep(activeIndex, overIndex)
            }
            overlay={
              <div className="grid grid-cols-[2rem,1fr] items-center gap-2">
                <div className="h-8 w-full rounded-full bg-primary/10 outline-dashed outline-ring" />
                <div className="h-8 w-full rounded-sm bg-primary/10 outline-dashed outline-ring" />
              </div>
            }
          >
            <div className="flex w-full flex-col gap-2">
              {workSteps.map(
                (field, index) => (
                  form.setValue(
                    `asset.${assetIndex}.work_step.${index}.step_order`,
                    index,
                  ),
                  (
                    <SortableItem
                      key={field.fieldId}
                      value={field.fieldId}
                      asChild
                    >
                      <div className="grid grid-cols-[2rem,1fr,auto,auto,auto] items-center gap-2">
                        <SortableDragHandle
                          variant="outline"
                          size="icon"
                          className="size-8 shrink-0 rounded-md"
                        >
                          {index + 1}
                        </SortableDragHandle>

                        <FormField
                          control={form.control}
                          name={`asset.${assetIndex}.work_step.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input className="h-8" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <SortableDragHandle
                          variant="ghost"
                          size="icon"
                          className="size-8 w-6 shrink-0"
                        >
                          <DragHandleDots2Icon
                            className="size-4"
                            aria-hidden="true"
                          />
                        </SortableDragHandle>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-8 shrink-0"
                          onClick={() => removeWorkStep(index)}
                        >
                          <TrashIcon
                            className="size-4 text-destructive"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </SortableItem>
                  )
                ),
              )}
            </div>
          </Sortable>
        </div>
      </DialogContent>
    </Dialog>
  );
}
