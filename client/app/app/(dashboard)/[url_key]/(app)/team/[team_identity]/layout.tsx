import { Shell } from "@/components/shells";
import { Button } from "@/components/ui/button";

interface TeamLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function TeamLayout({ children }: TeamLayoutProps) {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio vitae mauris cursus aliquam. Sed auctor, nunc id aliquet ultrices, nisl nunc fringilla nunc, auctor lacinia risus nunc id nunc. Nulla facilisi. Mauris in nunc in nunc viverra lacinia. Nulla facilisi. Sed at semper urna. Nulla facilisi. Sed auctor, nunc id aliquet ultrices, nisl nunc fringilla nunc, auctor lacinia risus nunc id nunc. Nulla facilisi. Mauris in nunc in nunc viverra lacinia. Nulla facilisi. Sed at semper urna.`;

  const paragraphs = Array.from({ length: 10 }, (_, index) => (
    <p key={index}>{loremIpsum}</p>
  ));

  return <Shell>{children}</Shell>;
}
