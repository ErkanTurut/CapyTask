"use client";
import { Icons } from "@/components/icons";
import { Item } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/lib/hooks/use-actions";
import { upsertStep } from "@/lib/service/step/actions/upsert";
import { getStepsByPlan } from "@/lib/service/step/fetch";
import { catchError, cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

interface StepListProps {
  steps: NonNullable<Awaited<ReturnType<typeof getStepsByPlan>>["data"]>;
}

function getDifference(
  oldSteps: StepListProps["steps"],
  newSteps: StepListProps["steps"],
): StepListProps["steps"] {
  return newSteps.filter((newStep, index) => newStep.id !== oldSteps[index].id);
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function StepList({ steps }: StepListProps) {
  const [stepsList, setStepsList] = useOptimistic(
    steps,
    (state, newState) => newState as StepListProps["steps"],
  );

  const { run } = useAction(upsertStep, {
    onSuccess(data) {
      toast.success("Step updated successfully");
    },
    onError: (err) => {
      catchError(new Error(err));
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

      startTransition(() => {
        setStepsList(items);
        run(getDifference(stepsList!, items));
      });
    }
  }
  return (
    <div>
      {/* <Icons.spinner
        className={cn(
          "absolute right-0 top-1 mr-10 animate-spin  text-muted-foreground",
          true ? "block" : "hidden",
        )}
      /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-full flex-col gap-1"
            >
              {stepsList.map((step, index) => {
                if (!step) return null;
                return (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided, { isDragging }) => {
                      if (!step) return null;
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
