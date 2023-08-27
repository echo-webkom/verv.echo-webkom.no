import { selectAllUsers } from "@/lib/db/queries";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./user-data-table";
import { columns } from "./user-columns";
import { ReloadButton } from "./reload-button";

export default async function AdminDashboard() {
  const user = await getUser();

  if (!user?.isAdmin) {
    return redirect("/");
  }

  const users = await selectAllUsers.execute();

  return (
    <main className="space-y-8 max-w-4xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard for admin</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Brukere:</h2>

          <ReloadButton />
        </div>

        <div>
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </main>
  );
}
