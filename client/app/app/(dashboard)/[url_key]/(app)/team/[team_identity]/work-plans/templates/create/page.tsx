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
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { WorkPlanTemplateCreateForm } from "@/components/forms/work-plan-template/work-plan-template-create-form";

interface createPageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  return (
    <Shell>
      <PageHeader
        id="work-plan-template-header"
        aria-labelledby="work-plan-template-header-heading"
      >
        <PageHeaderHeading size="sm">
          Create work plan template
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Work plan template are reusable templates that can be used to create
          work plans for your work orders.
        </PageHeaderDescription>
      </PageHeader>
      <Separator />

      <WorkPlanTemplateCreateForm url_key={params.url_key} />
    </Shell>
  );
}
