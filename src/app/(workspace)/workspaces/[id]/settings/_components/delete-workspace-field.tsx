"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const DeleteWorkspaceField = () => {
  const handleDelete = () => {
    toast.error("Bruh...");
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
      <h2 className="text-xl font-semibold">Slett arbeidsområde</h2>
      <p>Arbeidsområdet vil bli slettet permanent.</p>
      <div>
        <Button variant="destructive" onClick={handleDelete}>
          Slett
        </Button>
      </div>
    </div>
  );
};
