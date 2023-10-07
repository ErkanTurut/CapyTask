import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { user } from "@prisma/client";
import { catchError } from "@/lib/utils";

export const getUser = (user_id: string) => {
  return useSuspenseQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/${user_id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw catchError(new Error(await res.json()));
        }
        return res.json() as Promise<user>;
      } catch (err) {
        catchError(err);
      }
    },
  });
};

export const updateUser = (user_id: string) => {
  return useMutation({
    mutationKey: ["user", user_id],
    mutationFn: async (data: Partial<user>) => {
      try {
        const res = await fetch(`/api/users/${user_id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) return catchError(new Error(await res.json()));
      } catch (err) {
        catchError(err);
      }
    },
  });
};
