import { Shell } from "@/components/shells";

interface TeamLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function TeamLayout({ children }: TeamLayoutProps) {
  return <Shell>{children}</Shell>;
}
