"use client";

import { useState, useTransition } from "react";
import { JSONContent } from "@tiptap/react";

import { updateGroupDescription } from "@/actions/update-group-description";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Group } from "@/lib/constants";

type UpdateDescriptionProps = {
  group: Group;
  description?: JSONContent;
};

export const UpdateDescription = ({ group, description }: UpdateDescriptionProps) => {
  const [value, setValue] = useState(description);
  const [isPending, startTransition] = useTransition();

  const onSave = () => {
    startTransition(async () => {
      if (!value) return;
      updateGroupDescription(group, value);
    });
  };

  return (
    <>
      <Editor value={value} onChange={(value) => setValue(value)} />
      <Button disabled={isPending} onClick={onSave}>
        {isPending ? "Lagrer..." : "Lagre"}
      </Button>
    </>
  );
};
