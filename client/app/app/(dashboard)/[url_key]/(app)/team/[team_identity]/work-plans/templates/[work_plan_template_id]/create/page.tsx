import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import CreateWorlStepTemplateForm from "@/components/work-plan/templates/step/step-create";

interface PageProps {
  params: {
    team_identity: string;
    url_key: string;
    work_plan_template_id: string;
    team_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new step template</CardTitle>
        <CardDescription>
          Create a new step template that your your team should follow to
          complete a plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback="loading...">
          <CreateWorlStepTemplateForm
            work_plan_template_id={params.work_plan_template_id}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
