import { StepsSortableTableForm } from "@/components/forms/work-step-template/steps-sortable-table-form";
import { WorkStepTemplateForm } from "@/components/forms/work-step-template/work-step-template-form";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    step_id: string | null;
  };
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  const work_step_templates =
    await trpc.db.work_step_template.get.byWorkPlanTemplate({
      work_plan_template_id: params.work_plan_template_id,
    });

  if (!work_step_templates) {
    return notFound();
  }

  return (
    <div
      className={cn(
        "grid flex-1 grid-cols-1 items-start gap-2 md:gap-4",
        searchParams.step_id && "grid-cols-2",
      )}
    >
      <div>
        <Suspense fallback={<CardSkeleton />}>
          <StepsSortableTableForm
            work_plan_template_id={params.work_plan_template_id}
            initialData={work_step_templates}
          />
        </Suspense>
      </div>

      {searchParams.step_id && (
        <div>
          <Suspense fallback={<CardSkeleton />}>
            {(async () => {
              if (!searchParams.step_id) return null;
              const work_step_template =
                await trpc.db.work_step_template.get.byId({
                  id: searchParams.step_id,
                });
              if (!work_step_template) return null;
              return (
                <WorkStepTemplateForm
                  className="ease-in"
                  work_step_template_id={searchParams.step_id}
                  initialData={work_step_template}
                />
              );
            })()}
          </Suspense>
        </div>
      )}
    </div>
  );
}
