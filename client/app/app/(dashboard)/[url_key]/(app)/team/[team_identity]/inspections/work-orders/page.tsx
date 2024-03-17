import { Shell } from "@/components/shells";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./_components/columns";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <Shell>
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Work Orders
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage your work orders
        </PageHeaderDescription>
      </PageHeader>
      <Shell variant={"dashboard"}>
        <DataTable columns={columns} count={0} data={[]} />
      </Shell>
    </Shell>
  );
}
