import { AI } from "../(app)/_components/ai/actions";

interface layoutProps {
  children: React.ReactNode;
}

export default async function layoutPage({ children }: layoutProps) {
  return <AI>{children}</AI>;
}
