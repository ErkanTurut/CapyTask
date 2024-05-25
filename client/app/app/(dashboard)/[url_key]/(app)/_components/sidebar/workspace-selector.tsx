import WorkspaceNav from "@/components/workspace/workspace-navigation";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

interface WorkspaceSelectorProps {
  params: {
    url_key: string;
  };
}

export default async function WorkspaceSelector({
  params,
}: WorkspaceSelectorProps) {
  console.log("called");
  const { data: workspaces } = await trpc.db.workspace.getByCurrentUser();
  if (!workspaces) {
    redirect("/create");
  }
  const workspace = workspaces.find(
    (workspace) => workspace.url_key === params.url_key,
  );

  if (!workspace) {
    redirect("/create");
  }
  return (
    <WorkspaceNav
      className="shadow-none"
      workspaces={workspaces}
      workspace={workspace}
    />
  );
}
