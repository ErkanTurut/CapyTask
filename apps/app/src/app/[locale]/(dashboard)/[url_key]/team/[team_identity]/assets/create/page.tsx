import AssetCreateForm from "@/components/asset/AssetCreateForm";
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
} from "@gembuddy/ui/card";
import { trpc } from "@gembuddy/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface createTeamProps {
  params: Promise<{
    url_key: string;
    team_identity: string;
  }>;
}

export default async function createTeam(props: createTeamProps) {
  const params = await props.params;
  const { data: workspace } = await trpc.db.workspace.get.byUrlKey({
    url_key: params.url_key,
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
          <CardTitle>Invite team members</CardTitle>
          <CardDescription>
            Fill the team information that will be displayed{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <AssetCreateForm
              team_id={params.team_identity}
              workspace_id={workspace.id}
            />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
