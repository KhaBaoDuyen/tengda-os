"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function VideoEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] rounded-lg border border-slate-700 bg-slate-950 p-4 text-white outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(
        editor.getHTML()
      );
    },
  });

  return (
    <EditorContent
      editor={editor}
    />
  );
}