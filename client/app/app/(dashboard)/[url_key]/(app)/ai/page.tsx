"use client";

import { useState } from "react";
import { ClientMessage } from "./actions";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { Shell } from "@/components/shells";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  const { data } = api.db.user.getCurrentUser.useQuery();

  return (
    <ScrollArea className="h-screen">
      <div className="container h-screen max-w-3xl">
        <div className="flex flex-col gap-2">
          {conversation.map((message: ClientMessage) => {
            if (message.role === "assistant") {
              return (
                <div
                  className="mr-16 rounded-xl border bg-muted p-2 text-left"
                  key={message.id}
                >
                  <b>Buddy :</b>
                  <br />
                  {message.display}
                </div>
              );
            }

            return (
              <div
                className="ml-16 rounded-xl border bg-primary p-2 text-right text-primary-foreground"
                key={message.id}
              >
                <b>You :</b>
                <br />
                {message.display}
              </div>
            );
          })}
        </div>
        <div className="sticky bottom-0 flex gap-2 rounded-xl border bg-background/80 object-center p-2 text-muted-foreground shadow-inner backdrop-blur-sm">
          <Input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            className="shrink-0"
            onClick={async () => {
              setConversation((currentConversation: ClientMessage[]) => [
                ...currentConversation,
                { id: nanoid(), role: "user", display: input },
              ]);
              // @ts-ignore
              const { data: user } = data;

              const message = await continueConversation({ input, user });

              setConversation((currentConversation: ClientMessage[]) => [
                ...currentConversation,
                message,
              ]);
              setInput("");
            }}
          >
            Send Message
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
