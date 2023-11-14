import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { PostgrestError } from "@supabase/supabase-js";
import type { team, user_team } from "@prisma/client";
import { Database } from "@/types/supabase.types";

//api that send all the teams that current user is in
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const requestUrl = new URL(request.url);

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    //@ts-ignore
    const {
      data: team,
      error,
    }: { data: team[] | null; error: PostgrestError | null } = await supabase
      .from("team")
      .select(`*`);

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
