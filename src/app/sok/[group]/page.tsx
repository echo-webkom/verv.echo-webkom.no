import { notFound } from "next/navigation";
import { ApplicationForm } from "./application-form";
import { getUser } from "@/lib/session";
import { FancyLink } from "@/components/fancy-link";
import { Group, groupNames } from "@/lib/constants";

type Props = {
  params: {
    group: string;
  };
};

const getData = ({ params }: Props) => {
  const groups = Object.keys(groupNames);

  if (!groups.includes(params.group)) {
    return notFound();
  }

  return {
    id: params.group as Group,
    name: groupNames[params.group as Group],
  };
};

export const generateMetadata = async ({ params }: Props) => {
  const group = getData({ params });

  return {
    title: `Søknad ${group.name}`,
    description: `Send søknad til ${group.name}`,
  };
};

export default async function ApplicationPage({ params }: Props) {
  const user = await getUser();

  if (!user) {
    return (
      <main className="gap-10 flex flex-col max-w-lg w-full text-center mx-auto px-6">
        <h1 className="text-3xl font-bold">
          Du må logge inn for å sende en søknad.
        </h1>

        <p>
          Dette er for å forhindre spam og misbruk av søknadsskjemaet. Du kan
          logge inn med din feide-bruker.
        </p>

        <FancyLink href="/logg-inn">Logg inn</FancyLink>
      </main>
    );
  }

  const group = getData({ params });

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Send inn søknad til {group.name}</h1>

      <ApplicationForm group={group.id} user={user} />
    </main>
  );
}
