interface PageProps {
  params: {
    location_id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div> {params.location_id} </div>;
}
