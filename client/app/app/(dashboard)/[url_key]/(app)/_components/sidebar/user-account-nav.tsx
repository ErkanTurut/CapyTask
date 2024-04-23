import UserAccountNav from "@/components/user/user-account-nav";
import { createClient } from "@/lib/supabase/server";
import { getUserHandler } from "@/trpc/routes/user/getUser.handler";
import { trpc } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserNavProps {}

export default async function UserNav({}: UserNavProps) {
  const { data: user } = await trpc.db.user.getCurrentUser.query();

  if (!user) {
    redirect("/login");
  }
  return <UserAccountNav className="w-full" user={user} />;
}
