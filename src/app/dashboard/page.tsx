import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Group, groupNames } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const user = await getUser();

  if (!user || (user.groups.length === 0 && user?.role !== "admin")) {
    return redirect("/");
  }

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Du er logget inn som {user.name}.</p>
      <p>
        Grupper du er medlem av er:{" "}
        <span className="font-medium">
          {user.groups.map((group) => groupNames[group.group]).join(", ")}
        </span>
      </p>

      {user.role === "admin" && (
        <Button asChild>
          <Link href="/dashboard/admin">Til admin dashboard</Link>
        </Button>
      )}

      <ul className="divide-y">
        {Object.entries(groupNames).map(([group, name]) => {
          const isMember =
            user.role === "admin" ||
            user.groups.map((group) => group.group).includes(group as Group);

          return (
            <li className="flex flex-col py-3" key={group}>
              <a className="group" href={`/dashboard/${group}`}>
                <span className="mr-2">{isMember ? "✅" : "❌"}</span>
                <span className="group-hover:underline">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
