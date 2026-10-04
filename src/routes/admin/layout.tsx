import { component$, Slot } from "@qwik.dev/core";
import type { DocumentHead, RequestHandler } from "@qwik.dev/router";

export const onRequest: RequestHandler = ({ cacheControl, headers }) => {
  // Admin pages are per-user, so the CDN must never cache them.
  cacheControl({ noStore: true });
  headers.set("X-Robots-Tag", "noindex, nofollow");
};

export default component$(() => {
  return (
    <div class="min-h-screen bg-ice">
      <Slot />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Admin | Cris Jr. T. Fandiño",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
};
