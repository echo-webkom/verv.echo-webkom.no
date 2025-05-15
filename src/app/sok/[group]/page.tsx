import { notFound } from "next/navigation";

import { FancyLink } from "@/components/fancy-link";
import { auth } from "@/lib/auth/lucia";
import { Group, groupNames } from "@/lib/constants";
import { ApplicationForm } from "./_components/application-form";

type Props = {
  params: Promise<{
    group: string;
  }>;
};

const getData = (group: string) => {
  const groups = Object.keys(groupNames);

  if (!groups.includes(group)) {
    return notFound();
  }

  return {
    id: group as Group,
    name: groupNames[group as Group],
  };
};

export const generateMetadata = async ({ params }: Props) => {
  const { group } = await params;
  const g = getData(group);

  return {
    title: `Søknad ${g.name}`,
    description: `Send søknad til ${g.name}`,
  };
};

export default async function ApplicationPage({ params }: Props) {
  const { group } = await params;
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

  const g = getData(group);

  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-6">
      <h1 className="text-3xl font-bold">Send inn søknad til {g.name}</h1>

      <ApplicationForm group={g.id} user={user} />
    </main>
  );
}
