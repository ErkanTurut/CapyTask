import { Shell } from "@/components/shells";

export default async function Home() {
  return (
    <Shell as="div" className="gap-12">
      <section>Home </section>
      {Array.from({ length: 30 }).map((_, index) => (
        <p key={index}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptatum, quidem, quas accusantium voluptates doloremque
          quae fugiat voluptatibus doloribus magnam. Quisquam voluptate,
          voluptatum, quidem, quas accusantium voluptates doloremque quae fugiat
          voluptatibus doloribus magnam.
        </p>
      ))}
    </Shell>
  );
}
