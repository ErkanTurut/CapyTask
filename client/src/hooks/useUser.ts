import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import type { user } from "@prisma/client";
import { catchError } from "@/lib/utils";

export const getUser = (user_id: string) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user_id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw catchError(new Error(await res.json()));
        }
        return (await res.json()) as user;
      } catch (err) {
        catchError(err);
      }
    },
  });
};

export const updateUser = (user_id: string) => {
  const queryClient = useQueryClient();
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
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["user", user_id] });
      const previousUser = queryClient.getQueryData(["user", user_id]) as user;
      //combine previous user with new data
      queryClient.setQueryData(["user", user_id], {
        ...previousUser,
        ...data,
      });
      return { previousUser };
    },
  });
};
