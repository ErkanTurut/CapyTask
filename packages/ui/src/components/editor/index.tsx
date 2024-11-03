"use client";

import "./styles.css";

import {
  type Content,
  EditorContent,
  type JSONContent,
  useEditor,
  // @ts-ignore
} from "@tiptap/react";
import { BubbleMenu } from "./extentions/bubble-menu";
import { extensions } from "./extentions/register";

type EditorProps = {
  content?: Content;
  onChange?: ({
    content,
    text,
  }: { content: JSONContent; text: string }) => void;
};

export function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange?.({ content: editor.getJSON(), text: editor.getText() });
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} />
    </>
  );
}
// @ts-ignore
export { type Content } from "@tiptap/react";
