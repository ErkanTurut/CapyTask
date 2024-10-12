// "use client";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@gembuddy/ui/popover";
// import {
//   ControlBar,
//   useLocalParticipant,
//   useRoomContext,
// } from "@livekit/components-react";

// // import { Thread } from "@gembuddy/ui/assistant-ui/thread";
// import { Icons } from "@/components/icons";
// import { Button, buttonVariants } from "@gembuddy/ui/button";
// import { cn } from "@/lib/utils";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@gembuddy/ui/tooltip";
// import { useState } from "react";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gembuddy/ui/tabs";

// import { api } from "@/trpc/client";

// import { VoiceAgent } from "./call";
// import Chat from "./chat";
// import { useConnectionState } from "@livekit/components-react";

// export function AssistantModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const connectionState = useConnectionState();
//   const Room = useRoomContext();
//   const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

//   const { data } = api.db.user.getCurrentUser.useQuery(void 0, {
//     refetchOnWindowFocus: false,
//   });

//   if (!data || !data.data) {
//     return null;
//   }

//   return (
//     <Tooltip>
//       <Popover open={isOpen}>
//         <TooltipTrigger asChild>
//           <PopoverTrigger
//             className={cn(
//               "group fixed bottom-4 right-4 z-40 flex items-center gap-2",
//             )}
//           >
//             {connectionState === "connected" && !isOpen && (
//               <div className="flex h-9 animate-fade-in items-center justify-between rounded-md border bg-background p-2 text-sm duration-100">
//                 <Button
//                   onClick={async () => {
//                     await Room?.disconnect();
//                   }}
//                   variant={"ghost"}
//                   size={"icon"}
//                   className="h-7 w-7"
//                 >
//                   <Icons.stop className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     localParticipant?.setMicrophoneEnabled(
//                       !isMicrophoneEnabled,
//                     );
//                   }}
//                   variant={"ghost"}
//                   size={"icon"}
//                   className="h-7 w-7"
//                 >
//                   {isMicrophoneEnabled ? (
//                     <Icons.mic className="h-4 w-4" />
//                   ) : (
//                     <Icons.micOff className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             )}
//             <div
//               onClick={() => setIsOpen(!isOpen)}
//               className={cn(
//                 "flex h-9 w-9 grow-0 items-center justify-center rounded-lg border border-muted-foreground bg-background shadow-lg",
//                 connectionState === "connected" &&
//                   "animate-pulse border-primary",
//               )}
//             >
//               <Icons.logo className="h-6 w-6 grow-0" />
//             </div>
//           </PopoverTrigger>
//         </TooltipTrigger>
//         <PopoverContent
//           className="border-gradien flex h-[32rem] w-[32rem] flex-col gap-2 overflow-hidden p-2 shadow-xl"
//           sideOffset={4}
//           align="end"
//         >
//           <Tabs
//             defaultValue={connectionState === "connected" ? "call" : "chat"}
//             className="flex h-full flex-col overflow-clip"
//           >
//             <TabsList className="grid grid-cols-2">
//               <TabsTrigger value="chat">Chat with AI</TabsTrigger>
//               <TabsTrigger value="call">Call AI</TabsTrigger>
//             </TabsList>
//             <TabsContent
//               value="chat"
//               className="h-full animate-fade-in-left overflow-hidden p-1"
//             >
//               <Chat user={data.data} />
//             </TabsContent>
//             <TabsContent
//               className="h-full animate-fade-in-right overflow-hidden p-1"
//               value="call"
//             >
//               <VoiceAgent />
//             </TabsContent>
//           </Tabs>
//         </PopoverContent>
//       </Popover>
//       <TooltipContent side="left">
//         {connectionState === "connected" ? (
//           <span>Connected to AI Buddy</span>
//         ) : (
//           <span>Go Talk to AI Buddy</span>
//         )}
//       </TooltipContent>
//     </Tooltip>
//   );
// }
