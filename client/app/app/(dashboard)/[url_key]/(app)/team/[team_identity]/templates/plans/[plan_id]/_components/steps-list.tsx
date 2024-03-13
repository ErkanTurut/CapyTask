"use client";
import { Icons } from "@/components/icons";
import { Item } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/lib/hooks/use-actions";
import { upsertStep } from "@/lib/service/step/actions/upsert";
import { getStepsByPlan } from "@/lib/service/step/fetch";
import { catchError, cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { trpc as server } from "@/trpc/server";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

function getDifference(
  oldSteps: StepListProps["initialData"],
  newSteps: StepListProps["initialData"],
): StepListProps["initialData"] {
  return newSteps.filter((newStep, index) => newStep.id !== oldSteps[index].id);
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

interface StepListProps {
  // steps: NonNullable<Awaited<ReturnType<typeof getStepsByPlan>>["data"]>;
  initialData: NonNullable<
    Awaited<
      ReturnType<(typeof server)["db"]["step"]["getStepsByPlan"]["query"]>
    >
  >;
  plan_id: string;
}

export default function StepList({ initialData, plan_id }: StepListProps) {
  const [stepsList] = trpc.db.step.getStepsByPlan.useSuspenseQuery(
    { plan_id },
    {
      initialData,
    },
  );
  const utils = trpc.useUtils();

  const { mutate, isPending, isError } = trpc.db.step.upsert.useMutation({
    onMutate: async (newData) => {
      await utils.db.step.getStepsByPlan.cancel({ plan_id });
      const oldData = utils.db.step.getStepsByPlan.getData({ plan_id });
      utils.db.step.getStepsByPlan.setData({ plan_id }, newData);
      return { oldData };
    },
    onSuccess(data) {
      toast.success("Step updated successfully");
    },
    onError: (err, variables, ctx) => {
      catchError(new Error(err.message));
      utils.db.step.getStepsByPlan.setData({ plan_id }, ctx?.oldData);
    },
    onSettled: () => {
      utils.db.step.getStepsByPlan.invalidate({ plan_id });
    },
  });

  function onDragEnd(result: DropResult) {
    if (!result.destination || !result.source || !result) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (result.type === "list") {
      const items = reorder(
        stepsList,
        result.source.index,
        result.destination.index,
      ).map((item, index) => ({ ...item, order: index }));
      mutate(items);
    }
  }
  return (
    <div>
      <div className="flex w-full items-center justify-end px-4">
        <Icons.exlamationTriangle
          className={cn(" text-muted-foreground", isError ? "" : "hidden")}
        />
        <Icons.spinner
          className={cn(
            "  animate-spin  text-muted-foreground",
            isPending ? "" : "hidden",
          )}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-full flex-col gap-1"
            >
              {stepsList.map((step, index) => {
                return (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided, { isDragging }) => {
                      return (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={step.id}
                        >
                          <Link
                            href={{
                              query: {
                                step_id: step.id,
                              },
                            }}
                          >
                            <Item
                              size={"lg"}
                              className={cn(
                                "group",
                                isDragging &&
                                  "border border-border bg-background/40 backdrop-blur-[2px]",
                              )}
                            >
                              <div className="overflow-ellipsi flex h-5 w-full grow-0 items-center space-x-2 overflow-hidden text-sm">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-border p-2 text-xs">
                                  <span className="animate-fade-in">
                                    {index + 1}
                                  </span>

                                  {index !== stepsList.length - 1 && (
                                    <Separator
                                      orientation="vertical"
                                      className={cn(
                                        "delay-250 absolute mt-11 h-4 transition-opacity ease-in-out",
                                        isDragging
                                          ? "opacity-0"
                                          : "opacity-100",
                                      )}
                                    />
                                  )}
                                </div>
                                <h3 className="w-20 shrink-0 overflow-hidden overflow-ellipsis">
                                  {step.name}
                                </h3>
                                <Separator orientation="vertical" />
                                <p className="overflow-x-auto overflow-ellipsis whitespace-nowrap  text-muted-foreground">
                                  {step.description}
                                </p>
                              </div>
                              <Icons.arrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                            </Item>
                          </Link>
                        </li>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
