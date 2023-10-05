import { useQuery, useMutation } from "@tanstack/react-query";
import type { user } from "@prisma/client";

export const getUser = (user_id: string) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${user_id}`, {
        method: "GET",
      });
      return res.json() as Promise<user>;
    },
  });
};

export const updateUser = (user_id: string) => {
  return useMutation({
    mutationKey: ["user", user_id],
    mutationFn: async (data: Partial<user>) => {
      await fetch(`/api/users/${user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  });
};
