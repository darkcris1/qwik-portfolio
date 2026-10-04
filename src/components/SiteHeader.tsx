import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";
import { MenuIcon, XIcon } from "qwik-feather-icons";

export interface NavItem {
  key: string;
  href: string;
  label: string;
}

interface SiteHeaderProps {
  items: NavItem[];
  active: string;
  homeHref: string;
}

export const SiteHeader = component$<SiteHeaderProps>(({ items, active, homeHref }) => {
  const navOpen = useSignal(false);
  const mobileNavRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    const isOpen = track(() => navOpen.value);
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.value && event.target instanceof Node && !mobileNavRef.value.contains(event.target)) {
        navOpen.value = false;
      }
    };
    // Registered on the next tick so the click that opened the menu doesn't immediately close it.
    const id = setTimeout(() => document.addEventListener("click", handleClickOutside), 0);
    cleanup(() => {
      clearTimeout(id);
      document.removeEventListener("click", handleClickOutside);
    });
  });

  return (
    <header class="fixed inset-x-0 top-0 z-50">
      <div ref={mobileNavRef} class="relative mx-auto mt-3 max-w-6xl px-3 md:px-4">
        <nav
          aria-label="Main"
          class="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-ink/90 pl-3 pr-2 shadow-lg shadow-black/20 backdrop-blur-md"
        >
          <a href={homeHref} class="flex items-center gap-2.5 rounded-lg font-display text-sm font-medium text-white">
            <img src="/favicon.png" alt="" width={32} height={32} class="h-8 w-8 rounded-lg object-cover" />
            Cris Fandiño
          </a>

          <ul class="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  aria-current={active === item.key ? (item.key === "blog" ? "page" : "true") : undefined}
                  class={
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors " +
                    (active === item.key ? "bg-white/10 text-white" : "text-mist hover:text-white")
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            class="grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={navOpen.value ? "Close menu" : "Open menu"}
            aria-expanded={navOpen.value}
            aria-controls="mobile-menu"
            onClick$={() => (navOpen.value = !navOpen.value)}
          >
            {navOpen.value ? <XIcon class="h-6 w-6" /> : <MenuIcon class="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu, slides down under the bar. */}
        <div
          id="mobile-menu"
          inert={!navOpen.value}
          class={
            "absolute inset-x-3 top-full mt-2 origin-top rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-2xl backdrop-blur-md transition-all duration-200 ease-out md:hidden " +
            (navOpen.value ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-95 opacity-0")
          }
        >
          <ul>
            {items.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  aria-current={active === item.key ? (item.key === "blog" ? "page" : "true") : undefined}
                  onClick$={() => (navOpen.value = false)}
                  class={
                    "block rounded-xl px-4 py-3 font-medium transition-colors " +
                    (active === item.key ? "bg-white/10 text-white" : "text-mist hover:text-white")
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
});

// Nav links; pass "" on the home page and "/" elsewhere.
export const siteNavItems = (prefix: string): NavItem[] => [
  { key: "home", href: `${prefix}#home`, label: "Home" },
  { key: "about", href: `${prefix}#about`, label: "About" },
  { key: "projects", href: `${prefix}#projects`, label: "Work" },
  { key: "tools-frameworks", href: `${prefix}#tools-frameworks`, label: "Stack" },
  { key: "blog", href: "/blog/", label: "Blog" },
  { key: "contacts", href: `${prefix}#contacts`, label: "Contact" },
];
