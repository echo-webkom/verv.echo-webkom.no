import { Header } from "@/components/header/header";
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
      <div className="flex h-screen w-full flex-col">
        <Header hideLogo />
        <div className="flex flex-1 overflow-y-auto">
          <div className="scroll m-6 w-full max-w-screen-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
