"use client";

import { useState } from "react";
import { ClientMessage } from "../../(app)/_components/ai/actions";
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
    <div className="flex h-[100dvh] flex-col gap-2 px-60">
      <div className="flex-1 overflow-y-auto rounded-lg border bg-background p-4">
        <div className="flex flex-col gap-4">
          {conversation.map((message: ClientMessage) => {
            if (message.role === "assistant") {
              return (
                <div className="flex items-start gap-3" key={message.id}>
                  <div className="max-w-[70%] rounded-lg bg-muted p-3 text-sm">
                    <p>
                      <b>Buddy : </b>
                      {message.display}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[70%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                  <p>
                    <b>You : </b>
                    {message.display}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 flex items-center gap-2 border border-t bg-background px-4 py-3">
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          placeholder="Type a message..."
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
        {/* <Button variant="outline">send </Button> */}
      </div>
    </div>
  );
}
