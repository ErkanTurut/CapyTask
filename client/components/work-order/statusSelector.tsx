"use client";

import { catchError } from "@/lib/utils";
import { api } from "@/trpc/client";
import { Database } from "@/types/supabase.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "../icons";
import { ComboBox } from "../popoverCombobox";

interface StatusSelectorProps {
  status: {
    value: Database["public"]["Enums"]["Status"];
    label: string;
    icon: keyof typeof Icons;
  }[];
  initialStatus: Database["public"]["Enums"]["Status"];
  work_order_id: string;
}

export default function StatusSelector({
  initialStatus,
  status,
  work_order_id,
}: StatusSelectorProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.db.work_order.update.status.useMutation({
    onSuccess: async () => {
      await utils.db.work_order.get.byTeamIdentity.invalidate(undefined, {
        refetchType: "all",
      });
      router.refresh();
      toast.success("Work order updated successfully");
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  return (
    <ComboBox<Database["public"]["Enums"]["Status"]>
      initialValue={initialStatus}
      options={status}
      disabled={isPending}
      onSelect={(value) => {
        mutate({ id: work_order_id, status: value });
      }}
    />
  );
}
