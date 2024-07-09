import Link from "next/link";

type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const HeaderLink = ({ to, children }: HeaderLinkProps) => {
  return (
    <Link
      className="text-foreground-muted hover:text-foreground-muted-hover font-medium transition-colors hover:underline"
      href={to}
    >
      {children}
    </Link>
  );
};
