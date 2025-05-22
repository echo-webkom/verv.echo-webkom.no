import React from "react";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

type FancyLinkProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export const FancyLink = ({ className, children, ...props }: FancyLinkProps) => {
  return (
    <Link className={cn("group block w-full border-2 border-black", className)} {...props}>
      <div className="bg-secondary relative -top-2 -right-2 border-2 border-black px-4 py-1 text-center font-semibold transition-all duration-200 group-hover:-top-1 group-hover:-right-1">
        {children}
      </div>
    </Link>
  );
};
