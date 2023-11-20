import NavBar from "@/components/layouts/app-navbar";
import { getUserSession } from "@/lib/services/user";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const { data } = await getUserSession();

  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar user={data.session?.user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
