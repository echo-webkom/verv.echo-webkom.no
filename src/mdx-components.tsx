import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="py-4 text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="py-4 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="py-2 text-xl font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="py-2 text-lg font-bold">{children}</h4>,

    p: ({ children }) => <p className="py-2 text-lg">{children}</p>,
    ul: ({ children }) => <ul className="list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
    li: ({ children }) => <li className="ml-6 text-lg">{children}</li>,

    a: ({ children, href }) => {
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
    },
    ...components,
  };
}
