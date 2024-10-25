import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    step_id: string | null;
  }>;
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const work_plan_template = await trpc.db.work_plan_template.get.byId({
    id: params.work_plan_template_id,
  });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <div>
      <h1>Work Plan Template</h1>
      <p>{work_plan_template.data?.name}</p>
    </div>
  );
}
