import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HomeIcon, UserIcon, FolderIcon, MailIcon, CpuIcon } from "qwik-feather-icons"; // Added CpuIcon
import Home from "~/components/Home";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Contacts from "~/components/Contacts";
import ToolsFrameworks from "~/components/ToolsFrameworks"; // Import the new component
import { routeAction$ } from '@builder.io/qwik-city';
import { handleContactForm } from "~/lib/hooks/contact-api";
import { MenuIcon, XIcon } from "qwik-feather-icons";
import { useVisibleTask$, useSignal } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { motion, AnimatePresence as AP } from "motion/react";

const MotionDiv = qwikify$(motion.div)
const AnimatePresence = qwikify$(AP)

// Define the action to handle the POST request
export const useMyAction = routeAction$(async (data, { fail }) => {
  return handleContactForm(data, fail)
});

const navItems = [
  {
    href: "#home",
    label: "Home",
    icon: HomeIcon,
    scrollTo: "home",
  },
  {
    href: "#about",
    label: "About",
    icon: UserIcon,
    scrollTo: "about",
  },
  {
    href: "#projects",
    label: "Projects",
    icon: FolderIcon,
    scrollTo: "projects",
  },
  {
    href: "#tools-frameworks",
    label: "Tools",
    icon: CpuIcon,
    scrollTo: "tools-frameworks",
  },
  {
    href: "#contacts",
    label: "Contacts",
    icon: MailIcon,
    scrollTo: "contacts",
  },
];

export default component$(() => {
  const action = useMyAction();
  const navOpen = useSignal(false);
  const currentSection = useSignal("home");

  // Needs DOM section elements to observe as soon as the page is visible; IntersectionObserver
  // itself is passive, so this replaces the old scroll+getBoundingClientRect layout thrashing.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.intersectionRatio);
        }
        let found = currentSection.value;
        let best = 0;
        for (const item of navItems) {
          const ratio = visibleRatios.get(item.scrollTo) ?? 0;
          if (ratio > best) {
            best = ratio;
            found = item.scrollTo;
          }
        }
        currentSection.value = found;
      },
      // rootMargin shifts the observed viewport up so a section counts as
      // "current" once it passes the fixed nav bar, matching the old 80px offset
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const item of navItems) {
      const section = document.getElementById(item.scrollTo);
      if (section) observer.observe(section);
    }

    cleanup(() => observer.disconnect());
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
    <div class="min-h-screen bg-gray-50 flex flex-col items-center relative">
      <Home />
      <About />
      <Projects />
      <ToolsFrameworks />
      <Contacts action={action} />
      {/* Burger menu button for mobile */}
      <div
        ref={mobileNavRef}
        class="fixed h-[70px] z-[50] top-4 inset-x-4 flex flex-row items-center gap-2 md:hidden"
      >
        <button
          class="z-[100] bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all"
          aria-label="Open navigation menu"
          aria-expanded={navOpen.value}
          onClick$={() => (navOpen.value = !navOpen.value)}
        >
          { !navOpen.value && <MenuIcon class="w-8 h-8 text-gray-700" />}
          { navOpen.value && <XIcon class="w-8 h-8 text-gray-700" />}
        </button>
        {/* Mobile nav menu, slides down from below the burger icon */}
        <AnimatePresence>
          {navOpen.value && (
            <MotionDiv
              key="modal"
              className="absolute top-full left-0 mt-2 origin-top-left"
              initial={{ opacity: 0, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.85 }}>
              <div class="flex flex-col bg-white shadow-lg rounded-full px-3 py-6 gap-6 border border-gray-200">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-scrollto={item.scrollTo}
                    aria-current={currentSection.value === item.scrollTo ? "page" : undefined}
                    onClick$={() => (navOpen.value = false)}
                    class={
                      "flex flex-col items-center transition-colors duration-200 " +
                      (currentSection.value === item.scrollTo
                        ? "text-blue-600 font-bold"
                        : "text-gray-500 hover:text-blue-600")
                    }
                  >
                    <item.icon class="w-6 h-6" />
                    <span class="text-xs mt-1">{item.label}</span>
                  </a>
                ))}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop/Tablet sidebar nav */}
      <nav class="fixed top-1/2 left-6 -translate-y-1/2 z-50 hidden md:block">
        <div class="flex flex-col backdrop-blur-md bg-white shadow-lg rounded-full px-3 py-6 gap-6 md:gap-8 border border-white/20 transition-all duration-300 animate-fadeInUp">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-scrollto={item.scrollTo}
              aria-current={currentSection.value === item.scrollTo ? "page" : undefined}
              class={
                "flex flex-col items-center transition-colors duration-200 " +
                (currentSection.value === item.scrollTo
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600")
              }
            >
              <item.icon class="w-6 h-6" />
              <span class="text-xs mt-1">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      <footer class="w-full py-4 bg-gray-900 border-t text-center text-gray-100 text-sm z-40">
        © {new Date().getFullYear()} Cris Jr. T. Fandiño. All rights reserved.
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
