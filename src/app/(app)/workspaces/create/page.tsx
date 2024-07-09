import { ensureAuth } from "@/server/lib/ensure";
import { CreateWorkspaceForm } from "./_components/create-workspace-form";

export default async function CreateWorkspace() {
  await ensureAuth();

  return (
    <div className="container mx-auto max-w-screen-sm">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Opprett arbeidsområde</h1>
        <p className="mb-4">Fyll ut skjemaet under for å opprette et nytt arbeidsområde.</p>
      </div>

      <div className="bg-gray-100 p-8">
        <CreateWorkspaceForm />
      </div>
    </div>
  );
}
