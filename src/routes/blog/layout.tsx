import { component$, Slot } from "@qwik.dev/core";
import type { RequestHandler } from "@qwik.dev/router";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader, siteNavItems } from "~/components/SiteHeader";

export const onGet: RequestHandler = ({ cacheControl }) => {
  // Fresh for a minute, then served stale while the CDN refetches in the background.
  cacheControl({ public: true, maxAge: 60, sMaxAge: 60, staleWhileRevalidate: 60 * 60 * 24 });
};

const navItems = siteNavItems("/");

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <SiteHeader items={navItems} active="blog" homeHref="/" />
      <main class="flex-1">
        <Slot />
      </main>
      <SiteFooter topHref="#top" />
    </div>
  );
});
