import { component$ } from "@qwik.dev/core";
import { routeLoader$, type DocumentHead } from "@qwik.dev/router";
import { formatDate, getPublishedPost, readingMinutes } from "~/lib/posts";
import { jsonLd, SITE_NAME } from "~/lib/seo";
import { createPublicSupabase, isSupabaseConfigured } from "~/lib/supabase";


export const usePost = routeLoader$(async (requestEv) => {
  const post = isSupabaseConfigured(requestEv)
    ? await getPublishedPost(createPublicSupabase(requestEv), requestEv.params.slug)
    : null;
  if (!post) throw requestEv.error(404, "Post not found");
  return { ...post, minutes: readingMinutes(post.content_html) };
});

export default component$(() => {
  const post = usePost();

  return (
    <article>
      <header id="top" class="relative isolate overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-60 -top-60 -z-10 h-[48rem] w-[48rem] bg-[radial-gradient(closest-side,rgb(26_111_230/0.25),transparent)]"
        />
        <div class="mx-auto max-w-3xl px-4 pb-14 pt-32 md:pb-16 md:pt-40">
          <a href="/blog/" class="inline-flex items-center gap-1.5 text-sm font-medium text-mist transition-colors hover:text-white">
            <span aria-hidden="true">←</span> All posts
          </a>
          <h1 class="mt-6 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">{post.value.title}</h1>
          {post.value.description && (
            <p class="mt-5 text-lg leading-relaxed text-mist">{post.value.description}</p>
          )}
          <p class="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-sky">
            <time dateTime={post.value.published_at ?? undefined}>{formatDate(post.value.published_at)}</time>
            <span aria-hidden="true"> · </span>
            {post.value.minutes} min read
          </p>
        </div>
      </header>

      <div class="bg-white">
        <div
          class="prose prose-lg mx-auto max-w-3xl px-4 py-14 md:py-20 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink/80 prose-a:text-brand-ink prose-a:underline-offset-4 prose-strong:text-ink [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-ice [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 prose-code:font-normal prose-pre:text-ice prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-2xl prose-pre:bg-ink prose-img:rounded-2xl prose-blockquote:border-brand prose-li:marker:text-brand"
          dangerouslySetInnerHTML={post.value.content_html}
        />
        <div class="mx-auto max-w-3xl px-4 pb-20">
          <div class="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-ice p-6 sm:flex-row sm:items-center md:p-8">
            <div>
              <p class="font-display text-lg font-bold text-ink">Have a project in mind?</p>
              <p class="mt-1 text-muted">I build and run web apps end to end.</p>
            </div>
            <a href="/#contacts" class="btn-primary shrink-0">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const post = resolveValue(usePost);
  const canonical = new URL(`/blog/${post.slug}/`, url).href;
  const image = post.og_image_url || new URL("/assets/images/cris-picture.webp", url).href;
  const title = `${post.title} | ${SITE_NAME}`;

  return {
    title,
    meta: [
      { name: "description", content: post.description },
      { name: "author", content: SITE_NAME },
      { property: "og:type", content: "article" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { property: "og:site_name", content: SITE_NAME },
      { property: "article:published_time", content: post.published_at ?? "" },
      { property: "article:modified_time", content: post.updated_at },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        script: jsonLd({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image,
          url: canonical,
          mainEntityOfPage: canonical,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: { "@type": "Person", name: SITE_NAME, url: new URL("/", url).href },
        }),
        props: { type: "application/ld+json" },
      },
    ],
  };
};
