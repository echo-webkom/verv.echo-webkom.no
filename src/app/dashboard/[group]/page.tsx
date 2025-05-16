import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/lucia";
import { Group, groupNames } from "@/lib/constants";
import { isMemberOf } from "@/lib/is-member-of";

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

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-6">
      <h1 className="text-3xl font-bold">Dashboard for {groupNames[group]}</h1>

      <div className="flex flex-col gap-2">
        {[
          { label: `Rediger side`, href: `/${group}/rediger` },
          { label: `Se søkere`, href: `/dashboard/${group}/soknader` },
        ].map(({ label, href }) => (
          <div key={href}>
            <Link
              className="block border-2 bg-gray-200 p-4 text-center text-lg font-medium text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-300 hover:underline"
              href={href}
            >
              {label}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
