import { Shell } from "@/components/shells";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import CreateWorkPlanTemplateForm from "@/components/work-plan/templates/plan/plan-create-form";
import { trpc } from "@/trpc/server";

interface createPageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  const team = await trpc.db.team.getByIdentity({
    identity: params.team_identity,
  });

  if (!team) return null;
  return (
    <Shell variant={"markdown"}>
      <Card>
        <CardHeader>
          <CardTitle>Plan information</CardTitle>
          <CardDescription>
            Fill in the details below to create your new plan. This information
            will be displayed to your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <CreateWorkPlanTemplateForm team={team} url_key={params.url_key} />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
