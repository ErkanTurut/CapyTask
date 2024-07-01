"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

// import { Thread } from "@/components/ui/assistant-ui/thread";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
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

import { z } from "zod";

import Chat from "./chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { VoiceAgent } from "./call";

export function AssistantModal() {
  const [isOpen, setIsOpen] = useState(false);

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
                buttonVariants({ size: "icon" }),
                "fixed bottom-4 right-4 z-40 rounded-lg",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.logo className="h-6 w-6" />
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent className="mr-2 flex h-[32rem] w-[32rem] flex-col gap-2 p-2">
            <Tabs
              defaultValue="chat"
              className="flex h-full flex-col overflow-clip"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="chat">Chat with AI</TabsTrigger>
                <TabsTrigger value="call">Call AI</TabsTrigger>
              </TabsList>
              <TabsContent
                value="chat"
                className="animate-fade-in-left h-full overflow-hidden"
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
        <TooltipContent side="left">Talk to AI Buddy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
