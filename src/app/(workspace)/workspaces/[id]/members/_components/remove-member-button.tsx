"use client";

import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { removeMemberAction } from "../_actions/remove-member";

type RemoveMemberButtonProps = {
  workspaceId: string;
  userId: string;
};

export const RemoveMemberButton = ({ workspaceId, userId }: RemoveMemberButtonProps) => {
  const { executeAsync } = useAction(removeMemberAction);

  const handleClick = async () => {
    const result = await executeAsync({
      userId,
      workspaceId,
    });

    if (result?.data?.ok) {
      toast.success("Medlem fjernet");
    } else {
      toast.error(result?.data?.message);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="transition-colors hover:text-red-500"
    >
      <X size={16} />
    </Button>
  );
};
