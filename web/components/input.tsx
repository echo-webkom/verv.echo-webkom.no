import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = ComponentPropsWithoutRef<"input">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={cn(
        "form-input border-2 border-gray-300 bg-gray-100 px-3 py-2 focus:bg-white rounded-lg focus:rounded-sm transition-all",
        className
      )}
    />
  )
);
Input.displayName = "Input";
