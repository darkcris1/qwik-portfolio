import { component$, useSignal, useTask$ } from "@qwik.dev/core";
import { isBrowser } from "@qwik.dev/core/build";
import { Form, routeAction$, routeLoader$, z, zod$ } from "@qwik.dev/router";
import { deletePost, formatDate, listAllPosts } from "~/lib/posts";
import { createSupabase } from "~/lib/supabase";

export const usePosts = routeLoader$(async (requestEv) => {
  return listAllPosts(createSupabase(requestEv));
});

export const useDeletePost = routeAction$(
  async ({ id }, requestEv) => {
    const { error } = await deletePost(createSupabase(requestEv), id);
    if (error) return requestEv.fail(500, { message: error.message });
    return null;
  },
  zod$({ id: z.string().uuid() }),
);

export default component$(() => {
  const posts = usePosts();
  const del = useDeletePost();
  const confirmingId = useSignal<string | null>(null);
  const lastConfirmingId = useSignal<string | null>(null);

  // Keep keyboard focus on the row when Delete swaps to Confirm/Cancel and back.
  useTask$(({ track }) => {
    const id = track(() => confirmingId.value);
    if (!isBrowser) return;
    const target = id ? `confirm-${id}` : lastConfirmingId.value ? `delete-${lastConfirmingId.value}` : null;
    if (id) lastConfirmingId.value = id;
    if (target) requestAnimationFrame(() => document.getElementById(target)?.focus());
  });

  return (
    <>
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Posts</p>
          <h1 class="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">Manage the blog</h1>
        </div>
        <a href="/admin/posts/new/" class="btn-primary">
          New post
        </a>
      </div>

      {del.value?.failed && (
        <p role="alert" class="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't delete the post: {del.value.message}
        </p>
      )}

      {posts.value.length === 0 ? (
        <div class="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <h2 class="font-display text-lg font-bold text-ink">No posts yet</h2>
          <p class="mt-2 text-muted">Write your first post and publish it when it's ready.</p>
          <a href="/admin/posts/new/" class="btn-primary mt-6">
            Write a post
          </a>
        </div>
      ) : (
        <ul class="mt-10 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/5">
          {posts.value.map((post) => (
            <li key={post.id} class="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div class="min-w-0">
                <div class="flex items-center gap-3">
                  <span
                    class={
                      "rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider " +
                      (post.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
                    }
                  >
                    {post.status}
                  </span>
                  <span class="truncate font-mono text-xs text-muted">/blog/{post.slug}</span>
                </div>
                <a href={`/admin/posts/${post.id}/`} class="mt-2 block truncate font-semibold text-ink hover:text-brand-ink">
                  {post.title}
                </a>
                <p class="mt-1 text-sm text-muted">Updated {formatDate(post.updated_at)}</p>
              </div>

              <div class="flex shrink-0 items-center gap-2 text-sm">
                {post.status === "published" && (
                  <a
                    href={`/blog/${post.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-lg px-3 py-2 font-medium text-muted transition-colors hover:bg-ice hover:text-ink"
                  >
                    View ↗
                  </a>
                )}
                <a href={`/admin/posts/${post.id}/`} class="rounded-lg px-3 py-2 font-medium text-brand-ink transition-colors hover:bg-ice">
                  Edit
                </a>
                {confirmingId.value === post.id ? (
                  <Form action={del} class="flex items-center gap-2">
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      id={`confirm-${post.id}`}
                      type="submit"
                      class="rounded-lg bg-red-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Confirm delete
                    </button>
                    <button
                      type="button"
                      class="rounded-lg px-3 py-2 font-medium text-muted hover:bg-ice"
                      onClick$={() => (confirmingId.value = null)}
                    >
                      Cancel
                    </button>
                  </Form>
                ) : (
                  <button
                    id={`delete-${post.id}`}
                    type="button"
                    class="rounded-lg px-3 py-2 font-medium text-red-600 transition-colors hover:bg-red-50"
                    onClick$={() => (confirmingId.value = post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
