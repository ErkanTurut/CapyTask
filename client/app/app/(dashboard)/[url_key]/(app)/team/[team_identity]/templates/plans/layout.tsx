interface layoutProps {
  children: React.ReactNode;
}

export default async function layoutPage({ children }: layoutProps) {
  return <>{children}</>;
}
