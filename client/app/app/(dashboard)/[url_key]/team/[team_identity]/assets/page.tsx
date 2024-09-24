import { Shell } from "@/components/shells";
import TableContainer from "./_components/table/TableContainer";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

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
      <Suspense fallback={<TableSkeleton />}>
        <TableContainer params={params} searchParams={{ limit, page }} />
      </Suspense>
    </Shell>
  );
}
