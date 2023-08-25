import { notFound, redirect } from "next/navigation";
import { Group, groupNames } from "@/lib/constants";
import { selectApplicationsByGroup } from "@/lib/db/queries";
import { getUser } from "@/lib/session";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  params: {
    group: Group;
  };
};

export default async function GroupDashboard({ params }: Props) {
  const user = await getUser();

  const isAdmin = user && user.role === "admin";
  const shouldRedirect =
    !isAdmin &&
    !user?.groups.map((group) => group.group).includes(params.group);

  if (shouldRedirect) {
    return redirect("/dashboard");
  }

  if (!Object.keys(groupNames).includes(params.group)) {
    return notFound();
  }

  const applications = await selectApplicationsByGroup.execute({
    group: params.group,
  });

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">
        Dashboard for {groupNames[params.group]}
      </h1>

      <div>
        <h2 className="text-2xl font-bold">Søkere:</h2>

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
