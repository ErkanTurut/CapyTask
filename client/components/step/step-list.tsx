"use client";
import { Icons } from "@/components/icons";
import { catchError, cn } from "@/lib/utils";
import { Database } from "@/types/supabase.types";
import { buttonVariants } from "@/ui/button";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useAction } from "@/lib/hooks/use-actions";
import { updateStep } from "@/lib/service/step/actions/update";
interface StepListProps {
  steps: Database["public"]["Tables"]["step"]["Row"][] | null;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function getDifference(
  oldSteps: Database["public"]["Tables"]["step"]["Row"][],
  newSteps: Database["public"]["Tables"]["step"]["Row"][],
): Database["public"]["Tables"]["step"]["Row"][] {
  return newSteps.filter((newStep, index) => newStep.id !== oldSteps[index].id);
}

const StepList: React.FC<StepListProps> = ({ steps }) => {
  const pathname = usePathname().replace("/create", "");
  const [orderedData, setOrderedData] = useState<
    Database["public"]["Tables"]["step"]["Row"][] | null
  >(steps);

  const { run, isLoading } = useAction(updateStep, {
    onSuccess: (data) => {
      console.log("Step created successfully");
    },
    onError: (err) => {
      catchError(new Error(err));
    },
  });

  const debouncedValue = useDebouncedCallback(
    (data: Database["public"]["Tables"]["step"]["Row"][]) => {
      data.map((step) => {
        run({
          id: step.id,
          order: step.order,
        });
      });
    },
    3000,
    {},
  );

  useEffect(() => {
    setOrderedData(steps);
  }, [steps]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !result.source || !result) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (result.type === "list") {
      const items = reorder(
        orderedData!,
        result.source.index,
        result.destination.index,
      ).map((item, index) => ({ ...item, order: index }));
      setOrderedData(items);
      debouncedValue(getDifference(steps!, items));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" type="list" direction="vertical">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid w-full gap-1"
          >
            {orderedData?.map((step, index) => (
              <Draggable key={step.id} draggableId={step.id} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={step.id}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "default" }),
                      "group w-full grow justify-between overflow-hidden px-2",
                    )}
                  >
                    <Link
                      className="flex w-full items-center justify-between px-2"
                      href={{
                        query: { step_id: step.id },
                        pathname,
                      }}
                    >
                      {step.name}
                      <span className="sr-only">Get Started</span>
                      <div className="ml-1 transition group-hover:translate-x-1">
                        <Icons.arrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default StepList;
