import { selectAllUsers } from "@/lib/db/queries";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function AdminDashboard() {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    return redirect("/");
  }

  const users = await selectAllUsers.execute();

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard for admin</h1>

      <div>
        <h2 className="text-2xl font-bold">Brukere:</h2>

        <div>
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </main>
  );
}
