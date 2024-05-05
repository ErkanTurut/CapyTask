// app/api/chat/route.ts

import { streamText, tool } from "ai";
import { mistral } from "@ai-sdk/mistral";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Get a language model
  const model = mistral("mistral-small-latest");

  // Call the language model with the prompt
  const result = await streamText({
    model,
    system:
      "you are a chatbot assistant for a field service app called Gembuddy, and your name is Buddy",
    messages,
    maxTokens: 1024,
    temperature: 0.7,
    topP: 1,
    tools: {
      workOrderDetail: tool({
        description: "Get the detail of a work order by id",
        parameters: {
          id: "string",
        },
        execute: async ({ id }) => {},
      }),
    },
  });

  // Respond with a streaming response
  return result.toAIStreamResponse();
}
