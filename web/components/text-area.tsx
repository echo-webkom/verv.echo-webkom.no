import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        "form-textarea border-2 border-gray-300 bg-gray-100 px-3 py-2 focus:bg-white rounded-lg focus:rounded-sm transition-all",
        className
      )}
    />
  )
);
TextArea.displayName = "TextArea";
