"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateDescriptionAction } from "../_actions/update-description";

type ChangeDescriptionFieldProps = {
  workspaceId: string;
  initialDescription: string;
};

export const ChangeDescriptionField = ({
  workspaceId,
  initialDescription,
}: ChangeDescriptionFieldProps) => {
  const [description, setDescription] = useState(initialDescription);
  const { executeAsync, isExecuting } = useAction(updateDescriptionAction);

  const handleSubmit = () => {
    executeAsync({
      id: workspaceId,
      description,
    });
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 p-6">
      <h2 className="text-xl font-semibold">Endre beskrivelse</h2>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ny beskrivelse..."
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
