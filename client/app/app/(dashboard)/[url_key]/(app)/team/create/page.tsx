import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import CreateTeamForm from "@/components/team/team-create";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWorkspace } from "@/lib/service/workspace/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface createTeamProps {
  params: {
    url_key: string;
  };
}

export default async function createTeam({ params }: createTeamProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: workspace } = await getWorkspace({
    url_key: params.url_key,
    supabase,
  });
  if (!workspace) redirect("/create");

  return (
    <Shell variant="markdown" className="gap-2">
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Create a new team
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Create a new team to manage your projects. Fill in the team
          information below.
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
            <CreateTeamForm
              url_key={params.url_key}
              workspace_id={workspace.id}
            />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invite team members</CardTitle>
          <CardDescription>
            Fill the team information that will be displayed{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <CreateTeamForm
              workspace_id={workspace.id}
              url_key={params.url_key}
            />
          </Suspense>
          {/* i will add team invitation section here with form */}
        </CardContent>
      </Card>
    </Shell>
  );
}
