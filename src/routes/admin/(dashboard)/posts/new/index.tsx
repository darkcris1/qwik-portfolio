import { component$ } from "@qwik.dev/core";
import { routeAction$, zod$ } from "@qwik.dev/router";
import { PostForm } from "~/components/admin/PostForm";
import { handleSavePost, postFields } from "~/lib/post-actions";

export const useCreatePost = routeAction$(async (data, requestEv) => {
  const result = await handleSavePost(data, requestEv);
  if ("id" in result && result.id) throw requestEv.redirect(303, `/admin/posts/${result.id}/?created=1`);
  return result;
}, zod$(postFields));

export default component$(() => {
  const create = useCreatePost();

  return (
    <>
      <p class="eyebrow">New post</p>
      <h1 class="mb-8 mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">Write a post</h1>
      <PostForm action={create} post={null} />
    </>
  );
});
