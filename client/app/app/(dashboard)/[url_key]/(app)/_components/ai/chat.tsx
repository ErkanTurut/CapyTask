"use client";

// import { Thread } from "@/components/ui/assistant-ui/thread";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/ui/input";

import { useActions, useUIState } from "ai/rsc";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { api } from "@/trpc/client";
import { ClientMessage } from "./actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { nanoid } from "nanoid";
import { Database } from "@/types/supabase.types";
const formSchema = z.object({
  text_input: z.string({ message: "Input must be a string" }).min(1, {
    message: "Please enter a message",
  }),
});

interface ChatProps {
  user: Database["public"]["Tables"]["user"]["Row"];
}

export default function Chat({ user }: ChatProps) {
  const [conversation, setConversation] = useUIState();

  const { continueConversation } = useActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text_input: "",
    },
  });

  const handleSubmit = async (event: z.infer<typeof formSchema>) => {
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: event.text_input },
    ]);

    const message = await continueConversation({
      input: event.text_input,
      user,
    });
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    form.reset();
  };
  return (
    <div className="flex h-full flex-col gap-2">
      <ScrollArea className="h-full overflow-hidden rounded-md border">
        <div className="flex h-full w-full flex-col gap-2 p-1">
          {conversation.map((message: ClientMessage) => {
            if (message.role === "assistant") {
              return (
                <div
                  key={message.id}
                  className="max-w-[70%] rounded-lg bg-muted p-3 text-sm"
                >
                  <b>Buddy : </b>
                  {message.display}
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className="ml-auto max-w-[70%] rounded-lg bg-primary p-3 text-sm text-primary-foreground"
              >
                <b>You : </b>
                {message.display}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex w-full gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full gap-2"
          >
            <FormField
              control={form.control}
              name="text_input"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input placeholder="Type a message..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="icon" variant="outline" className="shrink-0">
              <Icons.PaperPlane className="h-4 w-4 -rotate-90 text-muted-foreground" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
