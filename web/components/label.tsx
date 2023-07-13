import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export type LabelProps = ComponentPropsWithoutRef<"label">;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      {...props}
      ref={ref}
      className={cn("text-gray-600 text-lg", className)}
    />
  )
);
Label.displayName = "Label";
