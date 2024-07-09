"use client";

import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  children: string;
};

export const Markdown = ({ children }: MarkdownProps) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};
