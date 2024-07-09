"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { Markdown } from "tiptap-markdown";

import { cn } from "@/lib/cn";
import { Button } from "../ui/button";
import { ToolbarButton } from "./toolbar-button";

type MarkdownEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: value,
    onUpdate: ({ editor }) => {
      const text = editor.storage.markdown.getMarkdown() as string;
      onChange?.(text);
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b bg-gray-100 p-1">
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <EditorContent
        className="prose-sm prose-p:my-0 list-disc bg-background p-2"
        editor={editor}
      />
    </div>
  );
};
