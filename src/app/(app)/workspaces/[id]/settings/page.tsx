import { MarkdownEditor } from "@/components/markdown-editor/markdown-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ensureMember } from "@/server/lib/ensure";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceSettings(props: Props) {
  await ensureMember(props.params.id);

  return (
    <div className="flex w-full max-w-screen-md flex-col gap-8">
      <h1 className="text-3xl font-semibold">Innstillinger</h1>

      <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
        <h2 className="text-xl font-semibold">Endre navn</h2>
        <Input placeholder="Nytt navn..." />
        <div>
          <Button>Oppdater</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
        <h2 className="text-xl font-semibold">Endre beskrivelse</h2>
        <MarkdownEditor />
        <div>
          <Button>Oppdater</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
        <h2 className="text-xl font-semibold">Slett arbeidsområde</h2>
        <p>Arbeidsområdet vil bli slettet permanent.</p>
        <div>
          <Button variant="destructive">Slett</Button>
        </div>
      </div>
    </div>
  );
}
