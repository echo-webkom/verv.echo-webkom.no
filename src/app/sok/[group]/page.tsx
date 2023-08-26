import { groupNames, Group } from "@/lib/constants";
import { notFound } from "next/navigation";
import { ApplicationForm } from "./application-form";

type Props = {
  params: {
    group: Group;
  };
};

export default function ApplicationPage({ params }: Props) {
  const { group } = params;

  if (!Object.keys(groupNames).includes(group)) {
    return notFound();
  }

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">
        Send inn søknad til {groupNames[group]}
      </h1>

      <ApplicationForm group={group} />
    </main>
  );
}
