"use client";

import { useState } from "react";
import { is } from "drizzle-orm";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateNameAction } from "../_actions/update-name";

type ChangeNameFieldProps = {
  workspaceId: string;
  initialName: string;
};

export const ChangeNameField = ({ workspaceId, initialName }: ChangeNameFieldProps) => {
  const [name, setName] = useState(initialName);
  const { executeAsync, isExecuting } = useAction(updateNameAction);

  const handleSubmit = () => {
    executeAsync({
      id: workspaceId,
      name,
    });
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
      <h2 className="text-xl font-semibold">Endre navn</h2>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nytt navn..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div>
        <Button disabled={isExecuting} onClick={handleSubmit}>
          {isExecuting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isExecuting ? "Oppdaterer..." : "Oppdater"}
        </Button>
      </div>
    </div>
  );
};
