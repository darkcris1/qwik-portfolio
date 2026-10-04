import type { RequestHandler } from "@qwik.dev/router";

export const onGet: RequestHandler = (requestEv) => {
  const body = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${requestEv.url.origin}/sitemap.xml\n`;
  requestEv.cacheControl({ public: true, maxAge: 3600, sMaxAge: 3600 });
  requestEv.headers.set("Content-Type", "text/plain; charset=utf-8");
  requestEv.send(200, body);
};
