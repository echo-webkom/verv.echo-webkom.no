import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export type SelectProps = ComponentPropsWithoutRef<"select">;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      {...props}
      ref={ref}
      className={cn(
        "form-select border-2 border-gray-300 text-gray-700 bg-gray-100 px-3 py-2 focus:bg-white rounded-lg focus:rounded-sm transition-all",
        className
      )}
    />
  )
);
Select.displayName = "Select";
