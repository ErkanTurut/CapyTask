"use client";

import { Shell } from "@/components/shells";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChat } from "ai/react";

export default function Chat() {
  return (
    <Shell variant={"centered"}>
      <div>
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </Shell>
  );
}
