import { component$ } from "@qwik.dev/core";
import { routeLoader$, type DocumentHead } from "@qwik.dev/router";
import { formatDate, listPublishedPosts, readingMinutes } from "~/lib/posts";
import { jsonLd, SITE_NAME } from "~/lib/seo";
import { createPublicSupabase } from "~/lib/supabase";

const BLOG_TITLE = "Blog";
const BLOG_DESCRIPTION =
  "Notes from Cris Jr. T. Fandiño on building web apps with Django, Python, React and Svelte, running them on AWS with Terraform, and working with AI tools like Claude Code.";

export const usePosts = routeLoader$(async (requestEv) => {
  try {
    const posts = await listPublishedPosts(createPublicSupabase(requestEv));
    return posts.map(({ content_html, ...post }) => ({ ...post, minutes: readingMinutes(content_html) }));
  } catch (err) {
    console.error("Failed to load blog posts", err);
    // Don't let the CDN keep an empty list after a database hiccup.
    requestEv.cacheControl({ noStore: true });
    return [];
  }
});

export default component$(() => {
  const posts = usePosts();

  return (
    <>
      <section id="top" class="relative isolate overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-60 -top-60 -z-10 h-[48rem] w-[48rem] bg-[radial-gradient(closest-side,rgb(26_111_230/0.25),transparent)]"
        />
        <div class="mx-auto max-w-6xl px-4 pb-16 pt-32 md:pb-20 md:pt-40">
          <p class="eyebrow text-sky">Blog</p>
          <h1 class="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Notes on building, shipping and running web apps.
          </h1>
          <p class="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
            What I learn working across Django, modern front ends, AWS infrastructure and AI-assisted
            development.
          </p>
        </div>
      </section>

      <section class="bg-ice">
        <div class="mx-auto max-w-6xl px-4 py-16 md:py-24">
          {posts.value.length === 0 ? (
            <div class="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
              <h2 class="font-display text-xl font-bold text-ink">No posts yet</h2>
              <p class="mt-2 text-muted">The first one is on its way. Check back soon.</p>
            </div>
          ) : (
            <ul class="grid gap-6 md:grid-cols-2">
              {posts.value.map((post) => (
                <li key={post.id}>
                  <article class="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-xl shadow-ink/5 transition hover:-translate-y-0.5 hover:border-brand/40 md:p-8">
                    <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                      <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                      <span aria-hidden="true"> · </span>
                      {post.minutes} min read
                    </p>
                    <h2 class="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-ink md:text-2xl">
                      <a href={`/blog/${post.slug}/`} class="after:absolute after:inset-0 after:rounded-3xl">
                        {post.title}
                      </a>
                    </h2>
                    <p class="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
                    <span class="mt-6 font-semibold text-brand-ink group-hover:underline" aria-hidden="true">
                      Read post →
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const canonical = new URL("/blog/", url).href;
  const image = new URL("/assets/images/cris-picture.webp", url).href;
  const title = `${BLOG_TITLE} | ${SITE_NAME}`;

  return {
    title,
    meta: [
      { name: "description", content: BLOG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: BLOG_DESCRIPTION },
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: BLOG_DESCRIPTION },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", type: "application/rss+xml", title: `${SITE_NAME} blog`, href: new URL("/blog/rss.xml", url).href },
    ],
    scripts: [
      {
        script: jsonLd({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} blog`,
          description: BLOG_DESCRIPTION,
          url: canonical,
          author: { "@type": "Person", name: SITE_NAME, url: new URL("/", url).href },
        }),
        props: { type: "application/ld+json" },
      },
    ],
  };
};
