import { component$ } from "@qwik.dev/core";
import { getYearsOfExperience } from "~/lib/experience";

export default component$(() => {
  const years = getYearsOfExperience();

  return (
    <section id="about" class="w-full bg-ice">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-24 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:py-32">
        <div>
          <p class="eyebrow">About</p>
          <h2 class="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            I work across the whole stack.
          </h2>
        </div>
        <div class="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I'm a full stack developer with over {years} years of experience building scalable web
            applications and enterprise systems, using Django, Python, JavaScript, Svelte, React,
            PostgreSQL, Redis, Docker and Nginx.
          </p>
          <p>
            I care most about system architecture, performance and code that stays easy to change.
            I like working closely with a team, mentoring junior developers, and keeping up with
            what's new in the tools I use.
          </p>
        </div>
      </div>
    </section>
  );
});
