import { notFound, redirect } from "next/navigation";
import { selectApplicationsByGroup } from "@/lib/db/queries";
import { Group, groupNames } from "@/lib/constants";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/lib/auth/lucia";
import { isMemberOf, isWebkom } from "@/lib/is-member-of";

type Props = {
  params: {
    group: Group;
  };
};

export default async function GroupDashboard({ params }: Props) {
  const user = await auth();

  if (!user || !isMemberOf(user, [params.group, "webkom"])) {
    return redirect("/logg-inn");
  }

  if (!Object.keys(groupNames).includes(params.group)) {
    return notFound();
  }

  const applications = await selectApplicationsByGroup(params.group);

  return (
    <main className="space-y-8 max-w-5xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">
        Dashboard for {groupNames[params.group]}
      </h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Søkere:</h2>

        <a
          href={`/api/applications/${params.group}`}
          className="text-lg py-2 text-blue-500 hover:underline"
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
