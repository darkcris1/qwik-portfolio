import type { RequestHandler } from "@qwik.dev/router";
import { listPublishedPostMeta } from "~/lib/posts";
import { createPublicSupabase } from "~/lib/supabase";
import { escapeXml } from "~/lib/xml";

export const onGet: RequestHandler = async (requestEv) => {
  const origin = requestEv.url.origin;
  const urls: { loc: string; lastmod?: string }[] = [{ loc: `${origin}/` }, { loc: `${origin}/blog/` }];

  let failed = false;
  try {
    const posts = await listPublishedPostMeta(createPublicSupabase(requestEv));
    for (const post of posts) {
      urls.push({ loc: `${origin}/blog/${post.slug}/`, lastmod: post.updated_at });
    }
  } catch (err) {
    console.error("Sitemap could not load posts", err);
    failed = true;
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ""}</url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  // A partial list after a database error must not be cached.
  requestEv.cacheControl(failed ? { noStore: true } : { public: true, maxAge: 300, sMaxAge: 300 });
  requestEv.headers.set("Content-Type", "application/xml; charset=utf-8");
  requestEv.send(200, body);
};
