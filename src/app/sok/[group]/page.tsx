import { notFound } from "next/navigation";

import { FancyLink } from "@/components/fancy-link";
import { auth } from "@/lib/auth/lucia";
import { Group, groupNames } from "@/lib/constants";
import { ApplicationForm } from "./_components/application-form";

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
  const user = await auth();

  if (!user) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 text-center">
        <h1 className="text-3xl font-bold">Du må logge inn for å sende en søknad.</h1>

        <p>
          Dette er for å forhindre spam og misbruk av søknadsskjemaet. Du kan logge inn med din
          feide-bruker.
        </p>

        <FancyLink href="/logg-inn">Logg inn</FancyLink>
      </main>
    );
  }

  const group = getData({ params });

  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-6">
      <h1 className="text-3xl font-bold">Send inn søknad til {group.name}</h1>

      <ApplicationForm group={group.id} user={user} />
    </main>
  );
}
