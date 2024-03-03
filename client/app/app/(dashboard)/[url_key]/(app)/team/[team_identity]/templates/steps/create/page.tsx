import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import CreateStepForm from "@/components/step/step-create";
import { getTeamByIdentity } from "@/lib/service/team/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface createPageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: team } = await getTeamByIdentity({
    identity: params.team_identity,
    supabase,
  });
  if (!team) return null;
  return (
    <Shell variant="markdown">
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Create a new step template for {team.name}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Create a new step template that can be used across your team's plans.`}
        </PageHeaderDescription>
      </PageHeader>

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
            <CreateStepForm team_id={team.id} />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
