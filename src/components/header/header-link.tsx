import Link from "next/link";

type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const HeaderLink = ({ to, children }: HeaderLinkProps) => {
  return (
    <Link
      className="px-2 py-2 font-medium text-foreground-muted transition-colors hover:text-foreground-muted-hover hover:underline"
      href={to}
    >
      {children}
    </Link>
  );
};
