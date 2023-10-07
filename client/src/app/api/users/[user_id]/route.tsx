import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authSchema } from "@/lib/validations/auth";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import type { user } from "@prisma/client";
import { Database } from "@/types/supabase.types";

const routeContextSchema = z.object({
  params: z.object({
    user_id: z.string(),
  }),
});

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    console.log("get api used for user");
    const { params } = routeContextSchema.parse(context);
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: user,
      error,
    }: { data: user | null; error: PostgrestError | null } = await supabase
      .from("user")
      .select()
      .eq("id", params.user_id)
      .single();

    if (error) throw error;
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error: Error | unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json(null, {
      status: 500,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const data = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { error } = await supabase
      .from("user")
      .update(data)
      .eq("id", params.user_id)
      .single();

    return NextResponse.next();
    if (error) throw error;
  } catch (error: Error | unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
