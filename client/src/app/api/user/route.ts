import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { PostgrestError } from "@supabase/supabase-js";
import type { user } from "@prisma/client";
import type { Database } from "@/types/supabase.types";

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { session: session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Unauthorized");
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const {
      data: user,
      error,
    }: { data: user | null; error: PostgrestError | null } = await supabase
      .from("user")
      .select()
      .eq("id", session.user.id)
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json(user, {
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
