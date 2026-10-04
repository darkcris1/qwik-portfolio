import { component$ } from "@qwik.dev/core";
import { getYearsOfExperience } from "~/lib/experience";

const focusAreas = [
  {
    label: "Full stack web apps",
    body: "Django and Python APIs with Angular, React or Svelte front ends, backed by PostgreSQL and Redis.",
    tags: ["Django", "Angular", "React", "Svelte"],
  },
  {
    label: "Cloud infrastructure",
    body: "AWS environments defined in Terraform, so every setup is versioned, reviewed and repeatable. Docker and Nginx for deploys.",
    tags: ["AWS", "Terraform", "Docker", "Nginx"],
  },
  {
    label: "AI-assisted development",
    body: "I work with Claude Code to plan changes, refactor, write tests and review code, so I ship faster without lowering the bar.",
    tags: ["Claude Code", "Testing", "Code review"],
  },
];

export default component$(() => {
  const { years, over } = getYearsOfExperience();

  return (
    <section id="about" class="w-full bg-ice">
      <div class="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div class="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <p class="eyebrow">About</p>
            <h2 class="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              I work across the whole stack.
            </h2>
          </div>
          <div class="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I'm a full stack developer with {over ? "over " : ""}{years} years of experience building scalable web
              applications and enterprise systems, from the database and API to the interface and the
              cloud it runs on.
            </p>
            <p>
              I care most about system architecture, performance and code that stays easy to change.
              I like working closely with a team, mentoring junior developers, and keeping up with
              what's new, which lately means putting AI to work in my day-to-day development.
            </p>
          </div>
        </div>

        <ul class="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          {focusAreas.map((area) => (
            <li
              key={area.label}
              class="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-xl shadow-ink/5 md:p-7"
            >
              <span
                aria-hidden="true"
                class="h-1.5 w-8 bg-linear-to-r from-sky to-brand [clip-path:polygon(18%_0,100%_0,82%_100%,0_100%)]"
              />
              <h3 class="mt-5 font-display text-lg font-bold tracking-tight text-ink">{area.label}</h3>
              <p class="mt-3 flex-1 leading-relaxed text-muted">{area.body}</p>
              <ul class="mt-5 flex flex-wrap gap-2" aria-label={`${area.label} tools`}>
                {area.tags.map((tag) => (
                  <li key={tag} class="rounded-md border border-line bg-ice px-2.5 py-1 font-mono text-xs text-ink/80">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
