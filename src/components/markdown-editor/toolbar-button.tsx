import React, { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { Button } from "../ui/button";

type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export const ToolbarButton = ({ children, onClick, isActive, ...props }: ToolbarButtonProps) => {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onClick}
      className={cn("p-1 hover:bg-gray-200", {
        "opacity-50": !isActive,
      })}
      {...props}
    >
      {children}
    </Button>
  );
};
