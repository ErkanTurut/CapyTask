import type { user } from "@prisma/client";
export { updateUser } from "./actions";
import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";

// export const getUser = async (user_id: string) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
//       method: "GET",
//     });
//     if (!res.ok) {
//       throw new Error(await res.json());
//     }
//     return (await res.json()) as user;
//   } catch (err) {
//     throw err;
//   }
// };

export const getUser = cache(
  async (user_id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(await res.json());
      }
      return (await res.json()) as user;
    } catch (err) {
      throw err;
    }
  },
  ["user"],
  {
    tags: ["user"],
  }
);
