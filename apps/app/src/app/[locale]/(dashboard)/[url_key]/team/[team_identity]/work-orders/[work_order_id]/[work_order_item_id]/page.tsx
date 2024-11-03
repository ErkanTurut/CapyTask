interface PageProps {
  params: Promise<{
    locale: string;
    url_key: string;
    team_identity: string;
    work_order_id: string;
    work_order_item_id: string;
  }>;
  searchParams: Promise<{
    wo_item: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <div>{params.work_order_item_id}</div>;
}
