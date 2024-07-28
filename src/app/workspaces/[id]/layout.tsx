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
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 overflow-hidden">
        <Sidebar workspaceId={id} />
        <div className="flex flex-1 overflow-y-auto">
          <div className="m-8 w-full max-w-screen-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
