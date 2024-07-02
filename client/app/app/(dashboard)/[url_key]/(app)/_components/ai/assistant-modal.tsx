"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// import { Thread } from "@/components/ui/assistant-ui/thread";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { api } from "@/trpc/client";

import { VoiceAgent } from "./call";
import Chat from "./chat";
import { useConnectionState } from "@livekit/components-react";

export function AssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const connectionState = useConnectionState();

  const { data } = api.db.user.getCurrentUser.useQuery(void 0, {
    refetchOnWindowFocus: false,
  });

  if (!data || !data.data) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <Popover open={isOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant:
                    connectionState === "connected" ? "default" : "secondary",
                }),
                "fixed bottom-4 right-4 z-40 rounded-lg border border-border",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.logo className="h-6 w-6" />
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent className="mr-2 flex h-[32rem] w-[32rem] flex-col gap-2 p-2">
            <Tabs
              defaultValue={connectionState === "connected" ? "call" : "chat"}
              className="flex h-full flex-col overflow-clip"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="chat">Chat with AI</TabsTrigger>
                <TabsTrigger value="call">Call AI</TabsTrigger>
              </TabsList>
              <TabsContent
                value="chat"
                className="h-full animate-fade-in-left overflow-hidden"
              >
                <Chat user={data.data} />
              </TabsContent>
              <TabsContent
                className="h-full animate-fade-in-right overflow-hidden"
                value="call"
              >
                <VoiceAgent />
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
        <TooltipContent side="left">
          {connectionState === "connected" ? (
            <span>Connected to AI Buddy</span>
          ) : (
            <span>Go Talk to AI Buddy</span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
