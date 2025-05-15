import { cache } from "react";
import { notFound } from "next/navigation";

const groups = [
  {
    id: "webkom",
    name: "Webkom",
    content: import("@/mdx/webkom.mdx"),
  },
  {
    id: "tilde",
    name: "Tilde",
    content: import("@/mdx/tilde.mdx"),
  },
  {
    id: "bedkom",
    name: "Bedkom",
    content: import("@/mdx/bedkom.mdx"),
  },
  {
    id: "makerspace",
    name: "Makerspace",
    content: import("@/mdx/makerspace.mdx"),
  },
  {
    id: "hyggkom",
    name: "Hyggkom",
    content: import("@/mdx/hyggkom.mdx"),
  },
  {
    id: "gnist",
    name: "Gnist",
    content: import("@/mdx/gnist.mdx"),
  },
  {
    id: "esc",
    name: "echo Sports Club",
    content: import("@/mdx/esc.mdx"),
  },
  {
    id: "programmerbar",
    name: "Programmerbar",
    content: import("@/mdx/programmerbar.mdx"),
  },
  {
    id: "consulting",
    name: "echo Consulting",
    content: import("@/mdx/consulting.mdx"),
  },
];

const getData = cache((id: string) => {
  const group = groups.find((group) => group.id === id);

  if (!group) {
    return notFound();
  }

  return group;
});

export const generateStaticParams = async () => {
  return groups.map((group) => ({ group: group.id }));
};

type Props = {
  params: Promise<{
    group: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { group } = await params;
  const g = getData(group);

  if (!g) {
    return notFound();
  }

  return {
    title: `Søknad ${g.name}`,
    description: `Send søknad til ${g.name}`,
  };
};

export default async function GroupPage({ params }: Props) {
  const { group } = await params;
  const g = getData(group);

  const Content = await g.content.then((content) => content.default);

  return <Content />;
}
