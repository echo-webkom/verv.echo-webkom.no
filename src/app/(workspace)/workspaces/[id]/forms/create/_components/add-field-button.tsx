import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type AddFieldButtonProps = {
  onClick?: () => void;
};

export const AddFieldButton = ({ onClick }: AddFieldButtonProps) => {
  return (
    <div>
      <Button type="button" onClick={onClick}>
        <Plus className="mr-2 h-4 w-4" />
        Legg til spørsmål
      </Button>
    </div>
  );
};
