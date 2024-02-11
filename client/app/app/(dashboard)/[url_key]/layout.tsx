import { Providers } from "./providers";
interface layoutProps {
  children: React.ReactNode;
}

export default async function layoutPage({ children }: layoutProps) {
  return <Providers>{children}</Providers>;
}
