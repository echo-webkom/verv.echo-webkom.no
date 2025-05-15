import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/lucia";
import { Group, groupNames } from "@/lib/constants";
import { selectApplicationsByGroup } from "@/lib/db/queries";
import { isMemberOf } from "@/lib/is-member-of";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Props = {
  params: Promise<{
    group: Group;
  }>;
};

export default async function GroupDashboard({ params }: Props) {
  const user = await auth();
  const { group } = await params;

  if (!user || !isMemberOf(user, [group, "webkom"])) {
    return redirect("/logg-inn");
  }

  if (!Object.keys(groupNames).includes(group)) {
    return notFound();
  }

  const applications = await selectApplicationsByGroup(group);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-6">
      <h1 className="text-3xl font-bold">Dashboard for {groupNames[group]}</h1>

      <Link className="text-blue-500 hover:underline" href={`/${group}/rediger`}>
        Rediger side
      </Link>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Søkere:</h2>

        <a
          href={`/api/applications/${group}`}
          className="py-2 text-lg text-blue-500 hover:underline"
          title="Last ned som CSV"
          download
        >
          Last ned som CSV
        </a>

        <div>
          {applications.length === 0 ? (
            <p>Ingen søkere enda</p>
          ) : (
            <DataTable columns={columns} data={applications} />
          )}
        </div>
      </div>
    </main>
  );
}
