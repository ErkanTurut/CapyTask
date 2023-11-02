import type { user } from "@prisma/client";
export { updateUser } from "./actions";
import { unstable_noStore as noStore } from "next/cache";

export const getUser = async (user_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
      method: "GET",
      cache: "no-store",
      next: {
        tags: ["user", user_id],
      },
    });
    noStore();
    if (!res.ok) {
      throw new Error(await res.json());
    }

    return (await res.json()) as user;
  } catch (err) {
    throw err;
  }
};
