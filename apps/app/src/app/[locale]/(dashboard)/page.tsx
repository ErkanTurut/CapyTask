import { SignOut } from "@/components/sign-out";
import { getI18n } from "@/locales/server";
import { trpc } from "@gembuddy/trpc/server";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { data: user } = await trpc.db.user.get.currentUser();
  const t = await getI18n();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>{t("welcome", { name: user?.email })}</p>

        <SignOut />
      </div>
    </div>
  );
}
