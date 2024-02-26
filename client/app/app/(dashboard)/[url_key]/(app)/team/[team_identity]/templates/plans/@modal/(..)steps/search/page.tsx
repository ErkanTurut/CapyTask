import { searchSteps } from "@/lib/service/step/fetch";
import { SearchStep } from "../../_components/search-step";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { headers as dynamic } from "next/headers";

interface pageProps {
  searchParams: {
    q: string;
  };
}

export default async function Page({ searchParams }: pageProps) {
  dynamic();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: steps } = await searchSteps({
    client: supabase,
    q: searchParams.q,
  });

  return <SearchStep steps={steps || []} searchParams={searchParams} />;
}
