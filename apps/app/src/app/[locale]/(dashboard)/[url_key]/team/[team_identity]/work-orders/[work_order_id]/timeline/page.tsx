import { TimelineList } from "@/components/dashboard/work-order/components/timeline-list";
import { Shell } from "@/components/shells";
import { trpc } from "@gembuddy/trpc/server";
import { NoteCard } from "./note-card";

type PageProps = {
  params: {
    url_key: string;
    team_identity: string;
    work_order_id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { data } = await trpc.db.work_order_history.get.byWorkOrder({
    work_order_id: params.work_order_id,
  });

  const { data: notes } = await trpc.db.note.get.byEntity({
    entity_id: params.work_order_id,
    entity_type: "work_order",
  });

  if (!data || data.length === 0) {
    return "No data";
  }

  return (
    <Shell>
      {notes?.map((note) => (
        <NoteCard
          key={note.id}
          content={note.content}
          created_at={note.created_at}
          created_by={note.created_by}
        />
      ))}
      <TimelineList workOrderHistory={data} />
    </Shell>
  );
}
