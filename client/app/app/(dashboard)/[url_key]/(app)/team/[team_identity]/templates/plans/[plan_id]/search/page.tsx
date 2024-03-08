import { searchSteps } from "@/lib/service/step/fetch";
import { SearchStep } from "../_components/search-step";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { headers as dynamic } from "next/headers";

interface pageProps {
  searchParams: {
    q: string;
  };
  params: {
    url_key: string;
    team_identity: string;
    plan_id: string;
  };
}

export default async function Page({ searchParams, params }: pageProps) {
  dynamic();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: steps } = await searchSteps({
    client: supabase,
    q: searchParams.q,
    team_identity: params.team_identity,
  });

  return (
    <SearchStep
      plan_id={params.plan_id}
      steps={steps || []}
      searchParams={searchParams}
    />
  );
}
