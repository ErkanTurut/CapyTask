import { Shell } from "@/components/shells";
import TableContainer from "./_components/table/TableContainer";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{
    url_key: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  return (
    <Shell>
      <Shell variant={"bento"}>
        <Suspense fallback={<TableSkeleton />}>
          <TableContainer params={params} searchParams={{ limit, page }} />
        </Suspense>
      </Shell>
    </Shell>
  );
}
