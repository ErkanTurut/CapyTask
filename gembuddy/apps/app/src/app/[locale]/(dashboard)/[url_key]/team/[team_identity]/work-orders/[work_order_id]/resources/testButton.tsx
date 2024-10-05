// "use client";

// import { useState } from "react";

// import { generate } from "./actions";
// import { readStreamableValue } from "ai/rsc";
// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   generateTimeSlots,
//   groupTimeSlotsByDay,
//   removeOverlaps,
// } from "@/lib/service-resource/utils";
// import { api } from "@/trpc/client";

// interface testButtonProps {
//   range: { from: string; to: string };
// }

// export default function TestButton({ range }: testButtonProps) {
//   const [generation, setGeneration] = useState<string>("");
//   const {
//     data: service_resource,
//     refetch,
//     isFetching,
//   } = api.db.service_resource.test.useQuery({
//     scheduled_range: {
//       from: range.from,
//       to: range.to,
//     },
//   });

//   const test = service_resource?.map((resource) => {
//     return {
//       ...resource,
//       available_time_slots: removeOverlaps({
//         scheduleRange: {
//           from: range.from,
//           to: range.to,
//         },
//         unavailableSlots: resource.service_appointment.map((appointment) => ({
//           from: appointment.start_date,
//           to: appointment.end_date,
//         })),
//       }).flatMap((slot) =>
//         generateTimeSlots({
//           scheduleRange: {
//             from: slot.from,
//             to: slot.to,
//           },
//           duration: 60,
//         }),
//       ),
//     };
//   });

//   return (
//     <div className="flex flex-col items-center gap-2 rounded-sm border p-2">
//       <Button
//         onClick={async () => {
//           const { object } = await generate(JSON.stringify(test));

//           for await (const partialObject of readStreamableValue(object)) {
//             if (partialObject) {
//               setGeneration(
//                 JSON.stringify(partialObject.notifications, null, 2),
//               );
//             }
//           }
//         }}
//       >
//         Let buddy found
//       </Button>
//       <div className="flex">{generation}</div>
//     </div>
//   );
// }
