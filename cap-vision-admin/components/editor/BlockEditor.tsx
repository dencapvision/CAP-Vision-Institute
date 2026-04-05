'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3,
  Quote, Link2, Image as ImageIcon, Code, Undo, Redo, Strikethrough
} from 'lucide-react'

interface BlockEditorProps {
  content: object | null
  onChange: (json: object) => void
  placeholder?: string
}

export default function BlockEditor({ content, onChange, placeholder = 'เริ่มเขียนเนื้อหาที่นี่...' }: BlockEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: content ?? '',
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  })

  if (!editor) return null

  const ToolbarButton = ({
    onClick, active, title, children
  }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors ${active
        ? 'bg-[#0f3460] text-white'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
    >
      {children}
    </button>
  )

  function addImage() {
    const url = prompt('URL รูปภาพ:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  function addLink() {
    const url = prompt('URL ลิงก์:')
    if (url) editor.chain().focus().toggleLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')} title="Bold">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')} title="Italic">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')} title="Code">
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')} title="Bullet list">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Link">
          <Link2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Insert image">
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
