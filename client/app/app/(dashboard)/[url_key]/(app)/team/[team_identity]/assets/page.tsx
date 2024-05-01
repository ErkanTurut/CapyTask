import { Shell } from "@/components/shells";
import AssetTable from "./_components/asset-table";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    team_identity: string;
  };
}

export default function Page({ params, searchParams }: PageProps) {
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  return (
    <Shell>
      <Shell variant={"bento"}>
        <AssetTable params={params} searchParams={{ limit, page }} />
      </Shell>
    </Shell>
  );
}
