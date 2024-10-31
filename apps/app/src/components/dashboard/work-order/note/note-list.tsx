"use client";
import { api } from "@gembuddy/trpc/client";
import type { trpc } from "@gembuddy/trpc/server";
import { use } from "react";

interface NoteListProps {
  noteAsync: ReturnType<(typeof trpc)["db"]["note"]["get"]["byWorkOrder"]>;
  work_order_id: string;
}

export function NoteList({ noteAsync, work_order_id }: NoteListProps) {
  const {
    data: { data: notes, count },
  } = api.db.note.get.byWorkOrder.useQuery(
    {
      work_order_id,
    },
    { initialData: use(noteAsync) },
  );
  if (!notes) {
    return <div>empty</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <div
          className="p-2 border bg-muted rounded-md flex flex-col items-start gap-2"
          key={note.id}
        >
          {note.content}
        </div>
      ))}
    </div>
  );
}
