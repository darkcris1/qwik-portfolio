import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import Home from "~/components/Home";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Contacts from "~/components/Contacts";
import ToolsFrameworks from "~/components/ToolsFrameworks";
import { routeAction$ } from '@qwik.dev/router';
import { handleContactForm } from "~/lib/hooks/contact-api";
import { MenuIcon, XIcon } from "qwik-feather-icons";
import { useVisibleTask$, useSignal } from "@qwik.dev/core";

export const useMyAction = routeAction$(async (data, { fail }) => {
  return handleContactForm(data, fail)
});

const navItems = [
  { href: "#home", label: "Home", scrollTo: "home" },
  { href: "#about", label: "About", scrollTo: "about" },
  { href: "#projects", label: "Work", scrollTo: "projects" },
  { href: "#tools-frameworks", label: "Stack", scrollTo: "tools-frameworks" },
  { href: "#contacts", label: "Contact", scrollTo: "contacts" },
];

export default component$(() => {
  const action = useMyAction();
  const navOpen = useSignal(false);
  const currentSection = useSignal("home");

  // Scrollspy: the active section is the last one whose top has passed a line 35% down the viewport.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const sections = navItems
      .map((item) => document.getElementById(item.scrollTo))
      .filter((el): el is HTMLElement => !!el);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let active = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) active = section.id;
      }
      if (atBottom && sections.length) active = sections[sections.length - 1].id;
      currentSection.value = active;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanup(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });
  });

  const mobileNavRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    const isOpen = track(() => navOpen.value);
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.value &&
        event.target instanceof Node &&
        !mobileNavRef.value.contains(event.target)
      ) {
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
    <div class="min-h-screen">
      <header class="fixed inset-x-0 top-0 z-50">
        <div ref={mobileNavRef} class="relative mx-auto mt-3 max-w-6xl px-3 md:px-4">
          <nav
            aria-label="Main"
            class="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-ink/90 pl-3 pr-2 shadow-lg shadow-black/20 backdrop-blur-md"
          >
            <a href="#home" class="flex items-center gap-2.5 rounded-lg font-display text-sm font-medium text-white">
              <img src="/favicon.png" alt="" width={32} height={32} class="h-8 w-8 rounded-lg object-cover" />
              Cris Fandiño
            </a>

            <ul class="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={currentSection.value === item.scrollTo ? "true" : undefined}
                    class={
                      "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors " +
                      (currentSection.value === item.scrollTo
                        ? "bg-white/10 text-white"
                        : "text-mist hover:text-white")
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
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={currentSection.value === item.scrollTo ? "true" : undefined}
                    onClick$={() => (navOpen.value = false)}
                    class={
                      "block rounded-xl px-4 py-3 font-medium transition-colors " +
                      (currentSection.value === item.scrollTo ? "bg-white/10 text-white" : "text-mist hover:text-white")
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

      <main>
        <Home />
        <About />
        <Projects />
        <ToolsFrameworks />
        <Contacts action={action} />
      </main>

      <footer class="w-full bg-ink text-mist">
        <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm sm:flex-row">
          <span class="flex items-center gap-2.5">
            <img src="/favicon.png" alt="" width={24} height={24} class="h-6 w-6 rounded-md object-cover" />© {new Date().getFullYear()} Cris Jr. T. Fandiño
          </span>
          <a href="#home" class="rounded-md transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
});

const SITE_NAME = "Cris Jr. T. Fandiño";
const DESCRIPTION =
  "Portfolio of Cris Jr. T. Fandiño, Full Stack Developer specializing in Django, Python, JS, Svelte, React, Postgres, Redis, Docker, Nginx.";
const OG_IMAGE_PATH = "/assets/images/cris-picture.webp";

export const head: DocumentHead = ({ url }) => {
  const ogImage = new URL(OG_IMAGE_PATH, url).href;

  return {
    title: `${SITE_NAME} | Full Stack Developer Portfolio`,
    meta: [
      { name: "description", content: DESCRIPTION },
      { name: "author", content: SITE_NAME },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: `${SITE_NAME} | Full Stack Developer Portfolio` },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: url.href },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} | Full Stack Developer Portfolio` },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: ogImage },
    ],
    scripts: [
      {
        script: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          jobTitle: "Full Stack Developer",
          url: url.href,
          image: ogImage,
          sameAs: [
            "https://www.linkedin.com/in/cris-jr-fandi%C3%B1o-9b3944149/",
            "https://github.com/darkcris1",
            "https://www.codewars.com/users/darkcris1",
          ],
        }),
        props: { type: "application/ld+json" },
      },
    ],
  };
};
