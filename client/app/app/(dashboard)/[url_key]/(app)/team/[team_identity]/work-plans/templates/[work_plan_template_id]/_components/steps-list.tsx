"use client";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { catchError, cn } from "@/lib/utils";
import { api } from "@/trpc/client";
import { trpc } from "@/trpc/server";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  initialData: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["work_step_template"]["getStepsByWorkPlanTemplate"]["query"]
      >
    >
  >;
  work_plan_template_id: string;
}

export default function StepList({
  initialData,
  work_plan_template_id,
}: StepListProps) {
  const pathname = usePathname();

  const [stepsList] =
    api.db.work_step_template.getStepsByWorkPlanTemplate.useSuspenseQuery(
      { work_plan_template_id },
      {
        initialData,
      },
    );

  const utils = api.useUtils();

  const { mutate, isPending, isError } =
    api.db.work_step_template.upsert.useMutation({
      onMutate: async (newData) => {
        await utils.db.work_step_template.getStepsByWorkPlanTemplate.cancel({
          work_plan_template_id,
        });
        const oldData =
          utils.db.work_step_template.getStepsByWorkPlanTemplate.getData({
            work_plan_template_id,
          });
        utils.db.work_step_template.getStepsByWorkPlanTemplate.setData(
          { work_plan_template_id },
          // @ts-expect-error
          newData,
        );
        return { oldData };
      },
      onSuccess() {
        toast.success("Step updated successfully");
      },
      onError: (err, variables, ctx) => {
        catchError(new Error(err.message));
        utils.db.work_step_template.getStepsByWorkPlanTemplate.setData(
          { work_plan_template_id },
          ctx?.oldData,
        );
      },
      onSettled: () => {
        utils.db.work_plan_template.get.withSteps.invalidate({
          id: work_plan_template_id,
        });
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
      ).map((item, index) => ({ ...item, step_order: index }));
      mutate(items);
    }
  }

  return (
    <div>
      <div className=" flex h-4 w-full items-center justify-end px-4">
        <Icons.exlamationTriangle
          className={cn(" text-muted-foreground", isError ? "" : "hidden")}
        />
        <Icons.spinner
          className={cn(
            " animate-spin  text-muted-foreground",
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
              {stepsList.length === 0 && (
                <div className="flex h-40 items-center justify-center">
                  <p className="text-muted-foreground">
                    No steps found for this work plan
                  </p>
                </div>
              )}
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
                              pathname: pathname.replace(/\/create/g, ""),
                              query: {
                                step_id: step.id,
                              },
                            }}
                            className={cn(
                              "group flex w-full items-center justify-between rounded-md  border border-background px-4 py-2 hover:border-border",
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
                                      isDragging ? "opacity-0" : "opacity-100",
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
