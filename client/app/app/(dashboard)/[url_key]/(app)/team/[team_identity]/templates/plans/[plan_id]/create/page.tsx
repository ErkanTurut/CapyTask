import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import CreateStepForm from "@/components/step/step-create";

interface PageProps {
  params: {
    team_identity: string;
    url_key: string;
    plan_id: string;
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
          <CreateStepForm plan_id={params.plan_id} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
