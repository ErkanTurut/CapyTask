interface LayoutProps {
  create: React.ReactNode;

  children: React.ReactNode;
}

export default async function Layout({ children, create }: LayoutProps) {
  return (
    <>
      {create} {children}
    </>
  );
}
