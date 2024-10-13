import { WorkPlanTemplateDeleteForm } from "@/components/forms/work-plan-template/work-plan-template-delete.form";
import { WorkPlanTemplateGeneralForm } from "@/components/forms/work-plan-template/work-plan-template-general-form";
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";

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
  const work_plan_template = await trpc.db.work_plan_template.get.byId({
    id: params.work_plan_template_id,
  });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <>
      <WorkPlanTemplateGeneralForm work_plan_template={work_plan_template} />
      <WorkPlanTemplateDeleteForm work_plan_template={work_plan_template} />
    </>
  );
}
