import { Button } from "@/components/ui/button";

type AddFieldButtonProps = {
  onClick?: () => void;
};

export const AddFieldButton = ({ onClick }: AddFieldButtonProps) => {
  return (
    <div>
      <Button type="button" onClick={onClick}>
        Legg til spørsmål
      </Button>
    </div>
  );
};
