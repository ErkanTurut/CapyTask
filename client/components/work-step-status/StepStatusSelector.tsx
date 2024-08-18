// "use client";

// import { catchError } from "@/lib/utils";
// import { api } from "@/trpc/client";
// import { Database } from "@/types/supabase.types";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Icons } from "../icons";
// import { ComboBox } from "../popoverCombobox";

// interface StepStatusSelectorProps {
//   status: {
//     value: Database["public"]["Enums"]["Status"];
//     label: string;
//     icon: keyof typeof Icons;
//   }[];
//   initialStatus: Database["public"]["Enums"]["Status"];
//   work_step_item_id: string;
// }

// export default function StepStatusSelector({
//   initialStatus,
//   status,
//   work_step_item_id,
// }: StepStatusSelectorProps) {
//   const utils = api.useUtils();
//   const router = useRouter();

//   const { mutate, isPending } = api.db.work_step_item.update.status.useMutation(
//     {
//       onSuccess: async () => {
//         await utils.db.work_order.get.byTeamIdentity.invalidate(undefined, {
//           refetchType: "all",
//         });
//         toast.success("Step updated successfully");
//       },
//       onError: (err) => {
//         catchError(new Error(err.message));
//       },
//       onSettled: () => {
//         router.refresh();
//       },
//     },
//   );

//   return (
//     <ComboBox<Database["public"]["Enums"]["Status"]>
//       initialValue={initialStatus}
//       options={status}
//       disabled={isPending}
//       onSelect={(value) => {
//         mutate({ id: work_step_item_id, status: value });
//       }}
//     />
//   );
// }
