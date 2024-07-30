interface PageProps {
  params: {
    asset_id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>{params.asset_id} </div>;
}
