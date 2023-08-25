import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold py-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold py-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold py-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold py-2">{children}</h4>
    ),

    p: ({ children }) => <p className="text-lg py-2">{children}</p>,
    ul: ({ children }) => <ul className="list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
    li: ({ children }) => <li className="text-lg ml-6">{children}</li>,

    a: ({ children, href }) => {
      const isExternal = !href?.startsWith("/");
      const to = href ?? "/";
      const classNames = "text-blue-500 hover:underline";

      if (isExternal) {
        return (
          <a
            href={to}
            className={classNames}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }

      return <Link className={classNames} href={href ?? ""}></Link>;
    },
    ...components,
  };
}
