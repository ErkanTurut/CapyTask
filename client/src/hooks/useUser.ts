import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getQueryClient from "@/lib/getQueryClient";
import type { user } from "@prisma/client";
import { catchError } from "@/lib/utils";
import { toast } from "sonner";
export const getUser = (user_id: string) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw catchError(new Error(await res.json()));
        }
        return (await res.json()) as Promise<user>;
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
      const res = await fetch(`/api/user/${user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.json());
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["user", user_id] });
      const previousUser = queryClient.getQueryData(["user", user_id]) as user;
      queryClient.setQueryData(["user", user_id], {
        ...previousUser,
        ...data,
      });
      return { previousUser };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["user", user_id], context?.previousUser);
      toast.error(
        err ? err.message : "Something went wrong, please try again later."
      );
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user_id] });
    },
  });
};

export const prefetchUser = async (user_id: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${user_id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(await res.json());
        }
        return (await res.json()) as user;
      } catch (err) {
        console.error(err);
      }
    },
  });
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};
