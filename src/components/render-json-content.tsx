import { JSONContent } from "@tiptap/react";

import { MarkdownH1, MarkdownH2, MarkdownH3, MarkdownH4, MarkdownP } from "@/mdx-components";

type RenderJSONContentProps = {
  json?: JSONContent;
};

export const RenderJSONContent = ({ json }: RenderJSONContentProps) => {
  if (json?.type === "doc") {
    return (
      <div>
        {json.content?.map((child, index) => <RenderJSONContent key={index} json={child} />)}
      </div>
    );
  }

  if (json?.type === "text") {
    return <span>{json.text}</span>;
  }

  if (json?.type === "heading") {
    const level: 1 | 2 | 3 | 4 = json.attrs?.level ?? 1;
    const headings: { [key in 1 | 2 | 3 | 4]: typeof MarkdownH1 } = {
      1: MarkdownH1,
      2: MarkdownH2,
      3: MarkdownH3,
      4: MarkdownH4,
    };
    const MarkdownH = headings[level];

    return (
      <MarkdownH>
        {json.content?.map((child, index) => <RenderJSONContent key={index} json={child} />)}
      </MarkdownH>
    );
  }

  if (json?.type === "paragraph") {
    return (
      <MarkdownP>
        {json.content?.map((child, index) => <RenderJSONContent key={index} json={child} />)}
      </MarkdownP>
    );
  }

  return null;
};
