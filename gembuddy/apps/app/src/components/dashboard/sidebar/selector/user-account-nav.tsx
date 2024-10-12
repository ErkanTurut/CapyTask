import UserAccountNav from "@/components/dashboard/navigation/user-account-nav";
import { trpc } from "@gembuddy/trpc/server";
import { redirect } from "next/navigation";

interface UserNavProps {}

export default async function UserNav({}: UserNavProps) {
  const { data: user } = await trpc.db.user.get.currentUser();

  if (!user) {
    redirect("/login");
  }
  return <UserAccountNav className="w-full" user={user} />;
}
