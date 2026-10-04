import { component$ } from "@qwik.dev/core";
import { routeAction$, routeLoader$, useLocation, zod$ } from "@qwik.dev/router";
import { PostForm } from "~/components/admin/PostForm";
import { handleSavePost, postFields, UUID_PATTERN } from "~/lib/post-actions";
import { getPostById } from "~/lib/posts";
import { createSupabase } from "~/lib/supabase";

export const usePost = routeLoader$(async (requestEv) => {
  const { id } = requestEv.params;
  const post = UUID_PATTERN.test(id) ? await getPostById(createSupabase(requestEv), id) : null;
  if (!post) throw requestEv.error(404, "Post not found");
  return post;
});

export const useUpdatePost = routeAction$(async (data, requestEv) => {
  if (!UUID_PATTERN.test(requestEv.params.id)) return requestEv.fail(404, { message: "Post not found" });
  return handleSavePost(data, requestEv, requestEv.params.id);
}, zod$(postFields));

export default component$(() => {
  const post = usePost();
  const update = useUpdatePost();
  const loc = useLocation();
  const created = loc.url.searchParams.has("created");

  return (
    <>
      <p class="eyebrow">Edit post</p>
      <h1 class="mb-8 mt-3 truncate font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{post.value.title}</h1>
      <PostForm
        key={post.value.id}
        action={update}
        post={post.value}
        notice={created ? (post.value.status === "published" ? "Post created and live." : "Draft created.") : undefined}
      />
    </>
  );
});
