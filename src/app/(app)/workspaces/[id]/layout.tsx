import Link from "next/link";
import { Cog, Home, List, Users2 } from "lucide-react";

import { ensureMember } from "@/server/lib/ensure";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const items = [
  {
    name: "Generelt",
    to: "/workspaces/{{workspace.id}}",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Skjemaer",
    to: "/workspaces/{{workspace.id}}/forms",
    icon: <List className="h-4 w-4" />,
  },
  {
    name: "Medlemmer",
    to: "/workspaces/{{workspace.id}}/members",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    name: "Innstillinger",
    to: "/workspaces/{{workspace.id}}/settings",
    icon: <Cog className="h-4 w-4" />,
  },
];

export default async function WorkspaceLayout({ children, params }: Props) {
  await ensureMember(params.id);
  const { id } = params;

  return (
    <div className="flex flex-1">
      <div className="flex w-full max-w-[270px] flex-col border-r-2 p-6">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                href={item.to.replace("{{workspace.id}}", id)}
                className="text-foreground-muted hover:text-foreground-muted-hover flex items-center gap-2 rounded-lg p-2 font-medium transition-colors hover:bg-gray-100"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
