import { Shell } from "@/components/shells";

import { WorkPlanTemplateCreateForm } from "@/components/forms/work-plan-template/work-plan-template-create-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@gembuddy/ui/separator";
import { trpc } from "@gembuddy/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface createPageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  const { data } = await trpc.db.workspace.getByUrlKey({
    url_key: params.url_key,
  });
  if (!data) {
    redirect("/create");
  }
  return (
    <Shell variant={"markdown"}>
      <PageHeader
        id="work-plan-template-header"
        aria-labelledby="work-plan-template-header-heading"
      >
        <PageHeaderHeading size="sm">Work plan template</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Work plan template are reusable templates that can be used to create
          work plans for your work orders.
        </PageHeaderDescription>
        <Separator />
      </PageHeader>

      <Suspense fallback={"loading..."}>
        <WorkPlanTemplateCreateForm workspace_id={data.id} />
      </Suspense>
    </Shell>
  );
}
