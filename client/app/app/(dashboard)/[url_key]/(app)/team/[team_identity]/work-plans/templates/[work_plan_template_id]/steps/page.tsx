import { StepsSortableTableForm } from "@/components/forms/work-step-template/steps-sortable-table-form";
import { WorkStepTemplateForm } from "@/components/forms/work-step-template/work-step-template-form";
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
  const { data: work_step_templates } =
    await trpc.db.work_step_template.get.byWorkPlanTemplate({
      work_plan_template_id: params.work_plan_template_id,
    });

  if (!work_step_templates) {
    return notFound();
  }

  console.log(searchParams.step_id);

  return (
    <div className="grid flex-1 items-start gap-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-3">
      <div className="lg:col-span-2">
        <StepsSortableTableForm work_step_templates={work_step_templates} />
      </div>
      <div>
        {searchParams.step_id && (
          <Suspense fallback={<div>Loading...</div>}>
            {(async () => {
              console.log("work_step_templates");
              if (!searchParams.step_id) return null;

              const { data: work_step_template } =
                await trpc.db.work_step_template.get.byId({
                  id: searchParams.step_id,
                });
              console.log(work_step_template);
              if (!work_step_template) return null;
              return (
                <WorkStepTemplateForm work_step_template={work_step_template} />
              );
            })()}
          </Suspense>
        )}
      </div>
    </div>
  );
}
