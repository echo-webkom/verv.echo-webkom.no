import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export type FormHintProps = ComponentPropsWithoutRef<"p"> & {
  error?: boolean;
};

export const FormHint = React.forwardRef<HTMLParagraphElement, FormHintProps>(
  ({ error = false, className, ...props }, ref) => (
    <p
      {...props}
      ref={ref}
      className={clsx(
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
