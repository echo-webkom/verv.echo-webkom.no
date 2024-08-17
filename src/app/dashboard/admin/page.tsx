import { selectAllUsers } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { DataTable } from "./user-data-table";
import { columns } from "./user-columns";
import { auth } from "@/lib/auth/lucia";
import { isMemberOf } from "@/lib/is-member-of";

export default async function AdminDashboard() {
  const user = await auth();

  if (!user || !isMemberOf(user, ["webkom"])) {
    return redirect("/");
  }

  const users = await selectAllUsers();

  return (
    <main className="space-y-8 max-w-4xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard for admin</h1>

      <p>Antall brukere: {users.length}</p>

      <DataTable columns={columns} data={users} />
    </main>
  );
}
