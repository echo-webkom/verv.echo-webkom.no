import { notFound } from "next/navigation";
import { cache } from "react";

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

export const generateMetadata = async ({
  params,
}: {
  params: { group: string };
}) => {
  const group = getData(params.group);

  if (!group) {
    return notFound();
  }

  return {
    title: `Søknad ${group.name}`,
    description: `Send søknad til ${group.name}`,
  };
};

export default async function GroupPage({
  params,
}: {
  params: { group: string };
}) {
  const group = getData(params.group);

  const Content = await group.content.then((content) => content.default);

  return <Content />;
}
