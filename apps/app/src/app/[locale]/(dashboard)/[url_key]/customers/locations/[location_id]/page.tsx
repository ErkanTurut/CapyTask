interface PageProps {
  params: Promise<{
    location_id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <div> {params.location_id} </div>;
}
