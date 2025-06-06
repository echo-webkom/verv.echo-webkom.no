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
    <>
      <h1 className="text-3xl font-bold">Dashboard for {groupNames[group]}</h1>

      <div className="flex flex-col gap-2">
        {[
          { label: "Rediger side", href: `/${group}/rediger` },
          { label: "Se søkere", href: `/dashboard/${group}/soknader` },
          { label: "Endre søknadstekst", href: `/dashboard/${group}/sporsmal` },
        ].map(({ label, href }) => (
          <div key={href}>
            <Link
              className="text-muted-foreground block border-2 p-4 text-center text-lg font-medium hover:underline"
              href={href}
            >
              {label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
