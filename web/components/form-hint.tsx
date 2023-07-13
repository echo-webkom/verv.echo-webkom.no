import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type FormHintProps = ComponentPropsWithoutRef<"p"> & {
  error?: boolean;
};

export const FormHint = React.forwardRef<HTMLParagraphElement, FormHintProps>(
  ({ error = false, className, ...props }, ref) => (
    <p
      {...props}
      ref={ref}
      className={cn(
        "text-gray-600 text-sm",
        {
          "text-red-500": error,
        },
        className
      )}
    />
  )
);
FormHint.displayName = "FormHint";
