import { ResponsiveCard } from "@/components/responsive-card";
import StepDeleteForm from "@/components/work-plan/templates/step/step-delete";
import StepUpdateForm from "@/components/work-plan/templates/step/step-update";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import CreateWorkOrderForm from "@/components/work-order/work-order-create-form";
import { Input } from "@/components/ui/input";

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
  const { data: work_step_template } =
    await trpc.db.work_step_template.getStepsByWorkPlanTemplate({
      work_plan_template_id: params.work_plan_template_id,
    });

  if (!work_step_template) {
    return notFound();
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        {work_step_template.map((step) => (
          <p>
            {step.name} + {step.description}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
