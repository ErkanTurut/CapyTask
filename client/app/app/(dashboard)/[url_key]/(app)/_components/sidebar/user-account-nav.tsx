import UserAccountNav from "@/components/user/user-account-nav";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

interface UserNavProps {}

export default async function UserNav({}: UserNavProps) {
  const { data: user } = await trpc.db.user.getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return <UserAccountNav className="w-full" user={user} />;
}
