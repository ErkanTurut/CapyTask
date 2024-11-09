import { Shell } from "@/components/shells";
import { formatTimeToNow } from "@/lib/utils";
import type { Database, Tables } from "@gembuddy/supabase/types";
import { trpc } from "@gembuddy/trpc/server";
import { Icons } from "@gembuddy/ui/icons";
import { Separator } from "@gembuddy/ui/separator";
type PageProps = {
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_order_id: string;
  }>;
};

interface TimelineItem {
  id: string;
  record_id: string;
  field: keyof Tables<"work_order">;
  old_value: string;
  new_value: string;
  created_at: string;
}

const TimelineItems: TimelineItem[] = [
  {
    id: "1",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "2",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "3",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "4",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "5",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "6",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "7",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "8",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
  {
    id: "9",
    record_id: "1",
    field: "name",
    old_value: "old value",
    new_value: "new value",
    created_at: "2021-10-10T12:00:00Z",
  },
];

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { data } = await trpc.db.work_order_history.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  if (!data || data.length === 0) {
    return "No data";
  }
  return (
    <Shell>
      <div className="relative">
        <div className="flex flex-col gap-4 p-1">
          {data.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                  <Icons.checkCircled className="size-6 text-muted-foreground z-20 bg-muted p-1 " />
                  <span className="text-xs flex items-center gap-2">
                    {item.old_value} <Icons.arrowRight className="size-3" />{" "}
                    {item.new_value}
                  </span>
                </div>
                <span className="text-xs">
                  {formatTimeToNow(new Date(item.created_at))}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute w-0.5 h-full left-4 bottom-2 z-10 bg-border " /> */}
        <div className="absolute top-0 h-full  w-8 bg-muted border rounded-md shadow-inner flex justify-items-center items-center flex-col pb-1">
          <div className="w-0.5 h-full bg-border " />
        </div>
      </div>
    </Shell>
  );
}
