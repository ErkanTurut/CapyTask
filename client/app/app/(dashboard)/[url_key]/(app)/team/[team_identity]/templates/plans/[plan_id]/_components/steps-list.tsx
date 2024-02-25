"use client";
import { Icons } from "@/components/icons";
import { Item } from "@/components/ui/item";
import { useAction } from "@/lib/hooks/use-actions";
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
import { useEffect, useOptimistic, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { upsertStep } from "@/lib/service/step/actions";
import { getStepsByPlan } from "@/lib/service/step/fetch";

interface StepListProps {
  data: Awaited<ReturnType<typeof getStepsByPlan>>["data"];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

// function getDifference(
//   oldSteps: Database["public"]["Tables"]["step"]["Row"][],
//   newSteps: Database["public"]["Tables"]["step"]["Row"][],
// ): Database["public"]["Tables"]["step"]["Row"][] {
//   return newSteps.filter((newStep, index) => newStep.id !== oldSteps[index].id);
// }

const StepList: React.FC<StepListProps> = ({ data }) => {
  if (!data) return null;
  const pathname = usePathname().replace("/create", "");
  const current_step_id = useSearchParams().get("step_id");

  // const [orderedData, setOrderedData] = useState<
  //   Awaited<ReturnType<typeof getStepsByPlan>>["data"] | null
  // >(data);

  const [steps, setSteps] = useOptimistic(
    data as Awaited<ReturnType<typeof getStepsByPlan>>["data"],
  );

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
    // if (result.type === "list") {
    //   const items = reorder(
    //     orderedData!,
    //     result.source.index,
    //     result.destination.index,
    //   ).map((item, index) => ({ ...item, order: index }));
    //   setOrderedData(items);
    //   debouncedValue(getDifference(orderedData!, items));
    // }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid w-full gap-1"
            >
              {data.step?.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided, { isDragging }) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={step.id}
                    >
                      <Item
                        size={"lg"}
                        // variant={
                        //   step.id === current_step_id ? "outline" : "ghost"
                        // }
                        className={cn(
                          "group flex w-full items-center  justify-between p-0 ",
                          isDragging &&
                            "border border-border bg-accent/40  backdrop-blur-[2px]",
                        )}
                      >
                        <Link
                          className="flex w-full items-center justify-between p-4"
                          href={{
                            query: { step_id: step.id },
                            pathname,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border p-2">
                              {index + 1}
                            </div>
                            <div>
                              <h2>{step.name}</h2>
                              <p className="text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          <div className="ml-1 transition group-hover:translate-x-1">
                            <Icons.arrowRight className="h-4 w-4" />
                          </div>
                        </Link>
                      </Item>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default StepList;
