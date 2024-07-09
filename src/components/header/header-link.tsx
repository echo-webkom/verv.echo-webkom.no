import Link from "next/link";

import { Button } from "../ui/button";

type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const HeaderLink = ({ to, children }: HeaderLinkProps) => {
  return (
    <Button variant="link" asChild>
      <Link href={to}>{children}</Link>
    </Button>
  );
};
