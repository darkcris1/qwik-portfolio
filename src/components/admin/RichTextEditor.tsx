import { $, component$, noSerialize, useSignal, useStore, useVisibleTask$, type NoSerialize } from "@qwik.dev/core";
import type { Editor } from "@tiptap/core";

interface RichTextEditorProps {
  name: string;
  initialHtml: string;
  labelId: string;
}

type Command =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "h2"
  | "h3"
  | "bulletList"
  | "orderedList"
  | "blockquote"
  | "codeBlock"
  | "link"
  | "image"
  | "undo"
  | "redo";

const tools: { cmd: Command; label: string; text: string; group: number }[] = [
  { cmd: "bold", label: "Bold", text: "B", group: 0 },
  { cmd: "italic", label: "Italic", text: "I", group: 0 },
  { cmd: "underline", label: "Underline", text: "U", group: 0 },
  { cmd: "strike", label: "Strikethrough", text: "S", group: 0 },
  { cmd: "h2", label: "Heading 2", text: "H2", group: 1 },
  { cmd: "h3", label: "Heading 3", text: "H3", group: 1 },
  { cmd: "bulletList", label: "Bulleted list", text: "• List", group: 2 },
  { cmd: "orderedList", label: "Numbered list", text: "1. List", group: 2 },
  { cmd: "blockquote", label: "Quote", text: "❝", group: 2 },
  { cmd: "codeBlock", label: "Code block", text: "</>", group: 2 },
  { cmd: "link", label: "Link", text: "Link", group: 3 },
  { cmd: "image", label: "Image from URL", text: "Image", group: 3 },
  { cmd: "undo", label: "Undo", text: "↶", group: 4 },
  { cmd: "redo", label: "Redo", text: "↷", group: 4 },
];

export const RichTextEditor = component$<RichTextEditorProps>(({ name, initialHtml, labelId }) => {
  const mountRef = useSignal<HTMLDivElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const editor = useSignal<NoSerialize<Editor>>();
  const active = useStore<Record<string, boolean>>({});
  const ready = useSignal(false);

  // Tiptap only loads in the browser, and only on admin pages.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ cleanup }) => {
    const [{ Editor }, { default: StarterKit }, { default: Image }] = await Promise.all([
      import("@tiptap/core"),
      import("@tiptap/starter-kit"),
      import("@tiptap/extension-image"),
    ]);
    if (!mountRef.value) return;

    const instance = new Editor({
      element: mountRef.value,
      content: initialHtml,
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
          link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
        }),
        Image,
      ],
      editorProps: {
        attributes: {
          class:
            "prose max-w-none min-h-[22rem] px-5 py-4 focus:outline-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-ink prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink prose-img:rounded-xl",
          "aria-labelledby": labelId,
          "aria-multiline": "true",
          role: "textbox",
        },
      },
      onTransaction: ({ editor: e }) => {
        if (inputRef.value) inputRef.value.value = e.isEmpty ? "" : e.getHTML();
        active.bold = e.isActive("bold");
        active.italic = e.isActive("italic");
        active.underline = e.isActive("underline");
        active.strike = e.isActive("strike");
        active.h2 = e.isActive("heading", { level: 2 });
        active.h3 = e.isActive("heading", { level: 3 });
        active.bulletList = e.isActive("bulletList");
        active.orderedList = e.isActive("orderedList");
        active.blockquote = e.isActive("blockquote");
        active.codeBlock = e.isActive("codeBlock");
        active.link = e.isActive("link");
      },
    });

    editor.value = noSerialize(instance);
    ready.value = true;
    cleanup(() => instance.destroy());
  });

  const run = $((cmd: Command) => {
    const e = editor.value;
    if (!e) return;
    const chain = e.chain().focus();
    switch (cmd) {
      case "bold":
        return chain.toggleBold().run();
      case "italic":
        return chain.toggleItalic().run();
      case "underline":
        return chain.toggleUnderline().run();
      case "strike":
        return chain.toggleStrike().run();
      case "h2":
        return chain.toggleHeading({ level: 2 }).run();
      case "h3":
        return chain.toggleHeading({ level: 3 }).run();
      case "bulletList":
        return chain.toggleBulletList().run();
      case "orderedList":
        return chain.toggleOrderedList().run();
      case "blockquote":
        return chain.toggleBlockquote().run();
      case "codeBlock":
        return chain.toggleCodeBlock().run();
      case "undo":
        return chain.undo().run();
      case "redo":
        return chain.redo().run();
      case "link": {
        const previous = e.getAttributes("link").href as string | undefined;
        const url = window.prompt("Link URL (leave empty to remove the link)", previous ?? "https://");
        if (url === null) return;
        if (url.trim() === "" || url === "https://") return chain.extendMarkRange("link").unsetLink().run();
        return chain.extendMarkRange("link").setLink({ href: url.trim() }).run();
      }
      case "image": {
        const src = window.prompt("Image URL");
        if (!src?.trim()) return;
        const alt = window.prompt("Describe the image (alt text)") ?? "";
        return chain.setImage({ src: src.trim(), alt }).run();
      }
    }
  });

  return (
    <div class="overflow-hidden rounded-2xl border border-line bg-white focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
      <div role="toolbar" aria-label="Formatting" class="flex flex-wrap items-center gap-1 border-b border-line bg-ice/70 p-2">
        {tools.map((tool, i) => (
            <button
              key={tool.cmd}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              aria-pressed={tool.cmd in active ? !!active[tool.cmd] : undefined}
              disabled={!ready.value}
              data-cmd={tool.cmd}
              onClick$={(_, el) => run(el.dataset.cmd as Command)}
              class={
                "min-w-9 rounded-lg px-2.5 py-1.5 font-mono text-xs font-medium transition-colors disabled:opacity-40 " +
                (i > 0 && tools[i - 1].group !== tool.group ? "ml-3 " : "") +
                (active[tool.cmd] ? "bg-ink text-white" : "text-ink hover:bg-white")
              }
            >
              {tool.text}
            </button>
        ))}
      </div>
      {!ready.value && (
        <div
          class="prose min-h-[22rem] max-w-none px-5 py-4 text-muted"
          dangerouslySetInnerHTML={initialHtml || "<p>Loading editor…</p>"}
        />
      )}
      {/* Tiptap owns this element's children, so Qwik must not render into it. */}
      <div ref={mountRef} />
      <input ref={inputRef} type="hidden" name={name} value={initialHtml} />
    </div>
  );
});
