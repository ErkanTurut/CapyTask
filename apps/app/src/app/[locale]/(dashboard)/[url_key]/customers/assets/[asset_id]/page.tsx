interface PageProps {
  params: Promise<{
    asset_id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <div>{params.asset_id} </div>;
}
