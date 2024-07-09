"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type MarkdownEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      onChange?.(text);
    },
  });

  return (
    <div className="bg-input overflow-hidden rounded-lg border p-1">
      {/* Toolbar */}
      <div className="bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-1"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-1"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className="p-1"
        >
          S
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
