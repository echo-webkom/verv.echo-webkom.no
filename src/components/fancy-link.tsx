import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React from "react";

type FancyLinkProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export const FancyLink = ({
  className,
  children,
  ...props
}: FancyLinkProps) => {
  return (
    <Link
      className={cn("group w-full bg-white border-black border-2", className)}
      {...props}
    >
      <div className="bg-[#ffeabb] group-hover:bg-[#ffeec9] relative -right-2 font-semibold -top-2 group-hover:-top-1 group-hover:-right-1 duration-200 transition-all px-4 text-center py-1 border-black border-2">
        {children}
      </div>
    </Link>
  );
};
