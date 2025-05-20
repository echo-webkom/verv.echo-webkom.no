import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <MarkdownH1>{children}</MarkdownH1>,
    h2: ({ children }) => <MarkdownH2>{children}</MarkdownH2>,
    h3: ({ children }) => <MarkdownH3>{children}</MarkdownH3>,
    h4: ({ children }) => <MarkdownH4>{children}</MarkdownH4>,

    p: ({ children }) => <MarkdownP>{children}</MarkdownP>,
    ul: ({ children }) => <MarkdownUl>{children}</MarkdownUl>,
    ol: ({ children }) => <MarkdownOl>{children}</MarkdownOl>,
    li: ({ children }) => <MarkdownLi>{children}</MarkdownLi>,

    a: ({ children, href }) => <MarkdownA href={href}>{children}</MarkdownA>,

    ...components,
  };
}

export const MarkdownH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="py-4 text-4xl font-bold">{children}</h1>
);

export const MarkdownH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="py-4 text-2xl font-bold">{children}</h2>
);

export const MarkdownH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="py-2 text-xl font-bold">{children}</h3>
);

export const MarkdownH4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="py-2 text-lg font-bold">{children}</h4>
);

export const MarkdownP = ({ children }: { children: React.ReactNode }) => (
  <p className="py-2 text-lg">{children}</p>
);

export const MarkdownUl = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc py-2 pl-4">{children}</ul>
);

export const MarkdownOl = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal py-2 pl-4 marker:text-gray-500">{children}</ol>
);

export const MarkdownLi = ({ children }: { children: React.ReactNode }) => (
  <li className="ml-6 text-lg [&>p]:p-0">{children}</li>
);

export const MarkdownA = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const isExternal = !href?.startsWith("/");
  const to = href ?? "/";
  const classNames = "text-blue-500 hover:underline";

  if (isExternal) {
    return (
      <a href={to} className={classNames} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link className={classNames} href={href ?? ""}></Link>;
};
