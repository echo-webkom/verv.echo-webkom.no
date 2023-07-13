import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export type LabelProps = ComponentPropsWithoutRef<"label">;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      {...props}
      ref={ref}
      className={clsx("text-gray-600 text-lg", className)}
    />
  )
);
Label.displayName = "Label";
