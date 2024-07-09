"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
// import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";

import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import StepTable from "../../team/[team_identity]/work-orders/[work_order_id]/_components/StepTable";
import { Database, createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import WorkOrderHeader from "../../team/[team_identity]/work-orders/[work_order_id]/_components/WorkOrderHeader";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import { getWorkOrderDetailHandler } from "@/trpc/routes/work_order/get.handler";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation({
  input,
  user,
}: {
  input: string;
  user: Database["public"]["Tables"]["user"]["Row"];
}): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();
  history.update([...history.get(), { role: "user", content: input }]);

  const result = await streamUI({
    model: openai("gpt-4o"),
    maxTokens: 1000,
    system: `you'r a friendly Assistant named Buddy and work for a company called Gembuddy. You'r to help users with your work orders. the name of the user talking to you is ${user.first_name!}.`,
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }
      return <div>{content}</div>;
    },
    tools: {
      work_order_steps: {
        description: "Get work order steps",
        parameters: z.object({
          workOrderId: z.string().describe("The ID of the work order"),
        }),
        generate: async function* ({ workOrderId }) {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing work order steps details for ${workOrderId}`,
            },
          ]);
          yield (
            <div className="grid">
              Fetching work order steps for {workOrderId}...
              <CardSkeleton />
            </div>
          );
          const db = createClient(cookies());
          const { data: work_order } = await db
            .from("work_order")
            .select("*, work_step_status(*, work_step(*)), asset(*)")
            .eq("id", workOrderId)
            .order("step_order", {
              referencedTable: "work_step_status",
            })
            .single();

          if (!work_order) {
            return <div>Work order not found</div>;
          }

          return <StepTable work_step_status={work_order.work_step_status} />;
        },
      },

      work_order_detail: {
        description: "Get work order details",
        parameters: z.object({
          workOrderId: z.string().describe("The ID of the work order"),
        }),
        generate: async function* ({ workOrderId }) {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing work order details for ${workOrderId}`,
            },
          ]);
          yield (
            <div className="grid">
              Fetching work order details for {workOrderId}...
              <CardSkeleton />
            </div>
          );
          const db = createClient(cookies());
          const { data: work_order } = await getWorkOrderDetailHandler({
            db,
            input: { id: workOrderId },
          });

          if (!work_order) {
            return <div>Work order not found</div>;
          }

          return (
            <WorkOrderHeader
              work_order={work_order}
              params={{ work_order_id: workOrderId }}
            />
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
