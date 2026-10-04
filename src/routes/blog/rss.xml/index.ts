import type { RequestHandler } from "@qwik.dev/router";
import { listPublishedPostMeta } from "~/lib/posts";
import { createPublicSupabase } from "~/lib/supabase";
import { escapeXml } from "~/lib/xml";

export const onGet: RequestHandler = async (requestEv) => {
  const origin = requestEv.url.origin;
  let items = "";

  let failed = false;
  try {
    const posts = await listPublishedPostMeta(createPublicSupabase(requestEv));
    items = posts
      .slice(0, 30)
      .map((post) => {
        const link = `${origin}/blog/${post.slug}/`;
        return [
          "    <item>",
          `      <title>${escapeXml(post.title)}</title>`,
          `      <link>${escapeXml(link)}</link>`,
          `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
          post.published_at ? `      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>` : "",
          `      <description>${escapeXml(post.description)}</description>`,
          "    </item>",
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n");
  } catch (err) {
    console.error("RSS feed could not load posts", err);
    failed = true;
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cris Jr. T. Fandiño · Blog</title>
    <link>${origin}/blog/</link>
    <atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on building, shipping and running web apps.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  // A partial list after a database error must not be cached.
  requestEv.cacheControl(failed ? { noStore: true } : { public: true, maxAge: 300, sMaxAge: 300 });
  requestEv.headers.set("Content-Type", "application/rss+xml; charset=utf-8");
  requestEv.send(200, body);
};
