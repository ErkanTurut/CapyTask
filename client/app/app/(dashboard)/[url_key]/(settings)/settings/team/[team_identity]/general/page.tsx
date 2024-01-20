import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CreateTeamForm from "@/components/team/team-create";
import UpdateTeamForm from "@/components/team/team-update";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTeamByUrlKey } from "@/lib/service/team/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

interface generalPageProps {
  params: {
    url_key: string;
    team_identity: string;
  };
}

export default async function generalPage({ params }: generalPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const team = await getTeamByUrlKey({
    indentity: params.team_identity,
    url_key: params.url_key,
    supabase,
  });
  return (
    <div>
      general page
      <div>url_key: {params.url_key}</div>
      <div>team_identity: {params.team_identity}</div>
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Update team
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Update your team information below.
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Team information</CardTitle>
          <CardDescription>
            Fill in the details below to create your new team. This information
            will be displayed to your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <UpdateTeamForm identity={params.team_identity} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
