import { ensureMember } from "@/server/lib/ensure";
import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default async function WorkspaceLayout({ children, params }: Props) {
  await ensureMember(params.id);
  const { id } = params;

  return (
    <div className="flex flex-1">
      <Sidebar workspaceId={id} />
      <div className="max-w-screen-lg flex-1 p-6">{children}</div>
    </div>
  );
}
