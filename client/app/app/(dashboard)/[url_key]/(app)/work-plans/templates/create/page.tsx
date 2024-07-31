import { Shell } from "@/components/shells";

import { WorkPlanTemplateCreateForm } from "@/components/forms/work-plan-template/work-plan-template-create-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

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
        <PageHeaderHeading size="sm">Work plan template</PageHeaderHeading>
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

const session = {
  user: {
    id: "1",
    email: "",
    metadata: {
      teams: [{}],
    },
  },
};
