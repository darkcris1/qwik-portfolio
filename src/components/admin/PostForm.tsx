import { component$, useSignal } from "@qwik.dev/core";
import { Form, type ActionStore } from "@qwik.dev/router";
import type { Post } from "~/lib/posts";
import { slugify } from "~/lib/slug";
import { RichTextEditor } from "./RichTextEditor";

type SaveResult = {
  failed?: boolean;
  message?: string;
  fieldErrors?: Record<string, string | undefined>;
  slug?: string;
  status?: string;
};

interface PostFormProps {
  action: ActionStore<any, any, any>;
  post: Post | null;
  notice?: string;
}

const field =
  "block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

export const PostForm = component$<PostFormProps>(({ action, post, notice }) => {
  const title = useSignal(post?.title ?? "");
  const slug = useSignal(post?.slug ?? "");
  const slugEdited = useSignal(!!post);
  const description = useSignal(post?.description ?? "");
  const status = useSignal<"draft" | "published">(post?.status ?? "draft");

  const result = action.value as SaveResult | undefined;
  const errors = result?.fieldErrors ?? {};
  const saved = result && !result.failed ? result : null;
  const liveSlug = saved?.slug ?? post?.slug;
  const isLive = (saved?.status ?? post?.status) === "published";

  return (
    <Form action={action} class="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div class="space-y-6">
        {(notice || saved) && (
          <p role="status" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {saved ? (saved.status === "published" ? "Post saved and live." : "Draft saved.") : notice}
          </p>
        )}
        {result?.failed && result.message && (
          <p role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't save the post: {result.message}
          </p>
        )}

        <div>
          <label for="title" class="mb-2 block text-sm font-semibold text-ink">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            aria-invalid={errors.title ? "true" : undefined}
            aria-describedby={errors.title ? "title-error" : undefined}
            class={`${field} font-display text-lg font-bold`}
            placeholder="What's this post about?"
            value={title.value}
            onInput$={(_, el) => {
              title.value = el.value;
              if (!slugEdited.value) slug.value = slugify(el.value);
            }}
          />
          {errors.title && <p id="title-error" class="mt-1.5 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <div class="mb-2 flex items-baseline justify-between">
            <label for="description" class="text-sm font-semibold text-ink">
              Description
            </label>
            <span aria-hidden="true" class={"font-mono text-xs " + (description.value.length > 160 ? "text-amber-700" : "text-muted")}>
              {description.value.length}/160
            </span>
          </div>
          <textarea
            id="description"
            name="description"
            rows={3}
            maxLength={300}
            class={field}
            placeholder="One or two sentences. Shown on the blog list and in search results."
            aria-invalid={errors.description ? "true" : undefined}
            aria-describedby={errors.description ? "description-help description-error" : "description-help"}
            value={description.value}
            onInput$={(_, el) => (description.value = el.value)}
          />
          <p id="description-help" class="mt-1.5 text-xs text-muted">Search engines show about 160 characters.</p>
          {errors.description && <p id="description-error" class="mt-1.5 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <p id="content-label" class="mb-2 block text-sm font-semibold text-ink">
            Content
          </p>
          <RichTextEditor name="content_html" initialHtml={post?.content_html ?? ""} labelId="content-label" />
          {errors.content_html && <p class="mt-1.5 text-sm text-red-600">{errors.content_html}</p>}
        </div>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div class="rounded-2xl border border-line bg-white p-5">
          <fieldset>
            <legend class="text-sm font-semibold text-ink">Visibility</legend>
            <div class="mt-3 grid grid-cols-2 gap-2">
              {(["draft", "published"] as const).map((value) => (
                <label
                  key={value}
                  class={
                    "rounded-xl border px-3 py-2.5 text-center text-sm font-medium capitalize transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky " +
                    (status.value === value ? "border-brand bg-brand/5 text-brand-ink" : "border-line text-muted hover:border-brand/40")
                  }
                >
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={status.value === value}
                    onChange$={(_, el) => (status.value = el.value as "draft" | "published")}
                    class="sr-only"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" disabled={action.isRunning} class="btn-primary mt-5 w-full justify-center disabled:opacity-70">
            {action.isRunning ? "Saving…" : status.value === "published" ? "Save and publish" : "Save draft"}
          </button>
          {isLive && liveSlug && (
            <a
              href={`/blog/${liveSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 block text-center text-sm font-medium text-brand-ink hover:underline"
            >
              View live post ↗
            </a>
          )}
        </div>

        <div class="space-y-5 rounded-2xl border border-line bg-white p-5">
          <div>
            <label for="slug" class="mb-2 block text-sm font-semibold text-ink">
              URL slug
            </label>
            <div class="flex items-center overflow-hidden rounded-xl border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
              <span class="bg-ice px-3 py-3 font-mono text-xs text-muted">/blog/</span>
              <input
                id="slug"
                name="slug"
                maxLength={80}
                class="min-w-0 flex-1 px-3 py-3 font-mono text-sm text-ink focus:outline-none"
                placeholder="my-post"
                aria-invalid={errors.slug ? "true" : undefined}
                aria-describedby={errors.slug ? "slug-error" : undefined}
                value={slug.value}
                onInput$={(_, el) => {
                  slugEdited.value = true;
                  slug.value = el.value;
                }}
              />
            </div>
            {errors.slug && <p id="slug-error" class="mt-1.5 text-sm text-red-600">{errors.slug}</p>}
          </div>

          <div>
            <label for="og_image_url" class="mb-2 block text-sm font-semibold text-ink">
              Social image URL <span class="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="og_image_url"
              name="og_image_url"
              type="url"
              class={`${field} text-sm`}
              placeholder="https://…/cover.png"
              aria-invalid={errors.og_image_url ? "true" : undefined}
              aria-describedby={errors.og_image_url ? "og-help og-error" : "og-help"}
              value={post?.og_image_url ?? ""}
            />
            <p id="og-help" class="mt-1.5 text-xs text-muted">Shown when the post is shared. Defaults to your photo.</p>
            {errors.og_image_url && <p id="og-error" class="mt-1.5 text-sm text-red-600">{errors.og_image_url}</p>}
          </div>
        </div>

        <a href="/admin/" class="block text-center text-sm text-muted hover:text-ink">
          ← Back to all posts
        </a>
      </aside>
    </Form>
  );
});
