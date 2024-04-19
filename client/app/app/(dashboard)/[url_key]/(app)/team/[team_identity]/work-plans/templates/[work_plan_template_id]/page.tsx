import { Icons } from "@/components/icons";
import { ResponsiveCard } from "@/components/responsive-card";
import StepDeleteForm from "@/components/work-plan/templates/step/step-delete";
import StepUpdateForm from "@/components/work-plan/templates/step/step-update";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";
import { headers as dynamic } from "next/headers";

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
  dynamic();
  if (searchParams.step_id) {
    const { data: step } = await trpc.db.work_step_template.get.query({
      id: searchParams.step_id,
    });
    if (!step) return null;
    return (
      <ResponsiveCard>
        <StepUpdateForm step={step} />
        <StepDeleteForm step={step} size="default" />
      </ResponsiveCard>
    );
  }

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Work Plan detail</CardTitle>
        <CardDescription>
          Update the details below to update your plan template. You will be
          able to use this plan in your work order.
        </CardDescription>
      </CardHeader>
      <CardContent>settings plan</CardContent>
    </Card>
  );
}
