interface layoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function layoutPage({ children, modal }: layoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
