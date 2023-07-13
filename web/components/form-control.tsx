import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

export type FormControlProps = ComponentPropsWithoutRef<"div">;

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx("flex flex-col gap-2", className)}
    />
  )
);
FormControl.displayName = "FormControl";
