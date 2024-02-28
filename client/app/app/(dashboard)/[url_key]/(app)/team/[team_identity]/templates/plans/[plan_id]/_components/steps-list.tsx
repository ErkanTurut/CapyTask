"use client";
import { Icons } from "@/components/icons";
import { Item } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/lib/hooks/use-actions";
import { upsertStep } from "@/lib/service/step/actions";
import { getStepsByPlan } from "@/lib/service/step/fetch";
import { catchError, cn } from "@/lib/utils";
import { Database } from "@/types/supabase.types";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

interface StepListProps {
  steps: NonNullable<Awaited<ReturnType<typeof getStepsByPlan>>["data"]>;
}

// function getDifference(
//   oldSteps: Database["public"]["Tables"]["step"]["Row"][],
//   newSteps: Database["public"]["Tables"]["step"]["Row"][],
// ): Database["public"]["Tables"]["step"]["Row"][] {
//   return newSteps.filter((newStep, index) => newStep.id !== oldSteps[index].id);
// }

export default function StepList({ steps }: StepListProps) {
  if (!steps) return null;
  const pathname = usePathname().replace("/create", "");
  // const [stepsList, setStepsList] = useState<StepListProps["steps"]>(steps);

  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const [stepsList, setStepsList] = useOptimistic(
    steps as StepListProps["steps"],
    (state, newState) => newState as StepListProps["steps"],
  );

  console.log(stepsList);
  const { run, isLoading } = useAction(upsertStep, {
    onSuccess(data) {
      console.log(data);
    },
    onError: (err) => {
      catchError(new Error(err));
    },
    onComplete() {
      console.log("completed");
    },
  });

  // const debouncedValue = useDebouncedCallback(
  //   (data: Database["public"]["Tables"]["step"]["Row"][]) => {
  //     run(data);
  //   },
  //   3000,
  // );

  // useEffect(() => {
  //   setOrderedData(steps);
  // }, [steps]);

  const onDragEnd = (result: DropResult) => {
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
      console.log("items", items);

      startTransition(() => {
        setStepsList(items);
      });
      // debouncedValue(getDifference(orderedData!, items));
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-full flex-col gap-1"
            >
              {stepsList.map((data, index) => {
                if (!data.step) return null;

                return (
                  <Draggable
                    key={data.step.id}
                    draggableId={data.step.id}
                    index={index}
                  >
                    {(provided, { isDragging }) => {
                      if (!data.step) return null;
                      return (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={data.step.id}
                        >
                          <Link
                            href={{
                              query: { step_id: data.step.id },
                              pathname,
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
                                  {index + 1}
                                </div>
                                <h3 className="w-20 shrink-0 overflow-hidden overflow-ellipsis">
                                  {data.step.name}
                                </h3>
                                <Separator orientation="vertical" />
                                <p className="overflow-x-auto overflow-ellipsis whitespace-nowrap  text-muted-foreground">
                                  {data.step.description}
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
    </>
  );
}
