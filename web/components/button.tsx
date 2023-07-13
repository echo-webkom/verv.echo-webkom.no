import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={clsx(
        "border-2 px-3 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-lg hover:rounded-sm transition-all",
        className
      )}
    />
  )
);
Button.displayName = "Button";
