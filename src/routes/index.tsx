import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import Home from "~/components/Home";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Contacts from "~/components/Contacts";
import ToolsFrameworks from "~/components/ToolsFrameworks";
import { routeAction$ } from '@qwik.dev/router';
import { handleContactForm } from "~/lib/hooks/contact-api";
import { SiteHeader, siteNavItems } from "~/components/SiteHeader";
import { SiteFooter } from "~/components/SiteFooter";
import { useVisibleTask$, useSignal } from "@qwik.dev/core";

export const useMyAction = routeAction$(async (data, { fail }) => {
  return handleContactForm(data, fail)
});

const navItems = siteNavItems("");
// The blog link has no section on this page, so the scrollspy skips it.
const spyKeys = navItems.map((item) => item.key).filter((key) => key !== "blog");

export default component$(() => {
  const action = useMyAction();
  const currentSection = useSignal("home");

  // Scrollspy: the active section is the last one whose top has passed a line 35% down the viewport.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const sections = spyKeys
      .map((key) => document.getElementById(key))
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

  return (
    <div class="min-h-screen">
      <SiteHeader items={navItems} active={currentSection.value} homeHref="#home" />

      <main>
        <Home />
        <About />
        <Projects />
        <ToolsFrameworks />
        <Contacts action={action} />
      </main>

      <SiteFooter topHref="#home" />
    </div>
  );
});

const SITE_NAME = "Cris Jr. T. Fandiño";
const DESCRIPTION =
  "Portfolio of Cris Jr. T. Fandiño, Full Stack Developer working with Django, Python, Svelte, React, Postgres, AWS and Terraform, using AI tools like Claude Code.";
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
          knowsAbout: ["Django", "Python", "TypeScript", "React", "Svelte", "Angular", "PostgreSQL", "AWS", "Terraform", "Docker", "Claude Code"],
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
