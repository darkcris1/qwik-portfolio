import { component$ } from "@qwik.dev/core";

export const SiteFooter = component$<{ topHref: string }>(({ topHref }) => {
  return (
    <footer class="w-full bg-ink text-mist">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm sm:flex-row">
        <span class="flex items-center gap-2.5">
          <img src="/favicon.png" alt="" width={24} height={24} class="h-6 w-6 rounded-md object-cover" />©{" "}
          {new Date().getFullYear()} Cris Jr. T. Fandiño
        </span>
        <div class="flex items-center gap-5">
          <a href="/blog/" class="rounded-md transition-colors hover:text-white">
            Blog
          </a>
          <a href="/blog/rss.xml" class="rounded-md transition-colors hover:text-white">
            RSS
          </a>
          <a href={topHref} class="rounded-md transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
});
