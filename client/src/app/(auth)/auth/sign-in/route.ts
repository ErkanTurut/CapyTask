import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authSchema, signUpSchema } from "@/lib/validations/auth";
import { AuthError } from "@supabase/supabase-js";
type Inputs = z.infer<typeof authSchema>;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = signUpSchema.parse(await request.json());
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return NextResponse.redirect(`${request.nextUrl.origin}`, {
      status: 301,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
    if (error instanceof AuthError) {
      return NextResponse.json(error, {
        status: error.status,
      });
    }
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

// return NextResponse.redirect(requestUrl.origin, {
//   // a 301 status is required to redirect from a POST to a GET route
//   status: 301,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { email, password } = signUpSchema.parse(await request.json());
//     const supabase = createRouteHandlerClient({ cookies });
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
//       },
//     });
//     if (error) {
//       throw error;
//     }
//     return NextResponse.redirect(
//       `${request.nextUrl.origin}/signup/verify-email`,
//       {
//         status: 301,
//       }
//     );
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(error, {
//         status: 400,
//       });
//     }
//     if (error instanceof AuthError) {
//       return NextResponse.json(error, {
//         status: error.status,
//       });
//     }
//     return NextResponse.json(error, {
//       status: 500,
//     });
//   }
// }
