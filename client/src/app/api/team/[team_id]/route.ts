import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { PostgrestError } from "@supabase/supabase-js";
import type { team } from "@prisma/client";
import type { Database } from "@/types/supabase.types";

const routeContextSchema = z.object({
  params: z.object({
    team_id: z.string(),
  }),
});

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const supabase = createRouteHandlerClient<Database>({ cookies });
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const {
      data: team,
      error,
    }: { data: team | null; error: PostgrestError | null } = await supabase
      .from("team")
      .select()
      .eq("id", params.team_id)
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json(team, {
      status: 200,
    });
  } catch (error: Error | z.ZodError | PostgrestError | unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json("Something went wrong, please try again later.", {
      status: 500,
    });
  }
}
