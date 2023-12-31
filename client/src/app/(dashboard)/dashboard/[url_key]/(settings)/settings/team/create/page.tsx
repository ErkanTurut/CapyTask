import CreateTeamForm from "@/components/team/team-create";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWorkspace } from "@/lib/services/workspace";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

interface createPageProps {
  params: {
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  const { data: workspace } = await getWorkspace(params.url_key);
  if (!workspace) {
    redirect(`/create`);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create Team</CardTitle>
        <CardDescription>
          Create a new team to collaborate with your buddies.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CreateTeamForm workspace_id={workspace.id} />
      </CardContent>
      {/* <CardFooter className="flex flex-wrap items-center justify-between gap-2"></CardFooter> */}
    </Card>
  );
}
