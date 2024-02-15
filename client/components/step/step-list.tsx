"use client";
import { Database } from "@/types/supabase.types";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Icons } from "@/components/icons";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";

interface stepListProps {
  steps: Database["public"]["Tables"]["step"]["Row"][] | null;
  children?: React.ReactNode;
}

const StepList: FC<stepListProps> = ({ steps, children }) => {
  const sortedSteps = steps?.sort((a, b) => (a.order || 0) - (b.order || 0));
  const pathname = usePathname().replace("/create", "");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    console.log(result);
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
            {sortedSteps?.map((step, index) => (
              <Draggable draggableId={step.id} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={step.id}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "default" }),
                      "group w-full grow justify-between overflow-hidden  px-2",
                    )}
                  >
                    <Link
                      className="flex w-full items-center justify-between px-2"
                      href={{
                        query: {
                          step_id: step.id,
                        },
                        pathname,
                      }}
                    >
                      {step.name}

                      <span className="sr-only">Get Started</span>
                      <div className="ml-1 transition group-hover:translate-x-1">
                        <Icons.arrowRight className=" h-4 w-4" />
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
