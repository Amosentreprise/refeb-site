"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  LinkIcon,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Rédigez le contenu de l'article..." }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    {
      icon: LinkIcon,
      action: () => {
        const url = window.prompt("URL du lien :");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      active: editor.isActive("link"),
    },
  ];

  return (
    <div className="rounded-xl border border-muted/20 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-muted/10 p-2">
        {buttons.map((btn, i) => {
          const Icon = btn.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={btn.action}
              className={cn(
                "rounded-lg p-2 transition-colors hover:bg-bg-alt",
                btn.active && "bg-primary/10 text-primary"
              )}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}