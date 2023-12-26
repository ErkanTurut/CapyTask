import { Shell } from "@/components/shells/shell";
import { Sidebar } from "./_components/sidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <Sidebar />
        <main className="z-10 flex w-full flex-1 flex-col items-start">
          <Shell variant="markdown">{children}</Shell>
        </main>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
