import type { user } from "@prisma/client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";
import { cookies } from "next/headers";

// export const getUser = async (user_id: string) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
//       method: "GET",
//       cache: "no-store",
//       next: {
//         tags: ["user", user_id],
//       },
//     });
//     if (!res.ok) {
//       // throw new Error(await res.json());
//     }
//     return (await res.json()) as user;
//   } catch (err) {
//     throw err;
//   }
// };

const supabase = createServerComponentClient({ cookies });

export const getUser = cache(
  async (user_id: string) => {
    const {
      data: user,
      error,
    }: { data: user | null; error: PostgrestError | null } = await supabase
      .from("user")
      .select()
      .eq("id", user_id)
      .single();
    return user;
  },
  ["user"],
  {
    tags: ["user"],
    revalidate: 60,
  }
);
