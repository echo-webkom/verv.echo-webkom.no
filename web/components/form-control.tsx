import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export type FormControlProps = ComponentPropsWithoutRef<"div">;

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
    />
  )
);
FormControl.displayName = "FormControl";
