import { NoteList } from "@/components/dashboard/work-order/note/note-list";
import { Shell } from "@/components/shells";
import { trpc } from "@gembuddy/trpc/server";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    url_key: string;
    team_identity: string;
    work_order_id: string;
  }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const noteAsync = trpc.db.note.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });
  return (
    <Shell>
      <Suspense>
        {/* <NoteList work_order_id={params.work_order_id} noteAsync={noteAsync} /> */}
      </Suspense>
    </Shell>
  );
}
