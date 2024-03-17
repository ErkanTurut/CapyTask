import { trpc } from "@/trpc/server";
import { headers as dynamic } from "next/headers";
import { SearchStep } from "../../_components/search-step";

interface pageProps {
  searchParams: {
    q: string;
  };
  params: {
    url_key: string;
    team_identity: string;
    inspection_template_id: string;
  };
}

export default async function Page({ searchParams, params }: pageProps) {
  dynamic();

  const { data: steps, error } = await trpc.db.template.step.searchSteps.query({
    q: searchParams.q,
    team_identity: params.team_identity,
  });

  return (
    <SearchStep
      inspection_template_id={params.inspection_template_id}
      steps={steps || []}
      searchParams={searchParams}
    />
  );
}
