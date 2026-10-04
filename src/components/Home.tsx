import { component$ } from "@qwik.dev/core";
import { LinkedinIcon, GithubIcon, CodeIcon } from "qwik-feather-icons";
import { getYearsOfExperience } from "~/lib/experience";

const socials = [
  { href: "https://www.linkedin.com/in/cris-jr-fandi%C3%B1o-9b3944149/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://github.com/darkcris1", label: "GitHub", icon: GithubIcon },
  { href: "https://www.codewars.com/users/darkcris1", label: "Codewars", icon: CodeIcon },
];

export default component$(() => {
  const { years, over } = getYearsOfExperience();

  return (
    <section id="home" class="relative isolate w-full overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-60 -top-60 -z-10 h-[56rem] w-[56rem] bg-[radial-gradient(closest-side,rgb(26_111_230/0.28),transparent)]"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div class="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-32 md:grid-cols-[1.15fr_0.85fr] md:pb-28 md:pt-40">
        <div>
          <p class="eyebrow text-sky">Full stack developer · Philippines</p>
          <h1 class="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Cris Jr. T.
            <br />
            <span class="text-gradient">Fandiño</span>
          </h1>
          <p class="mt-7 max-w-xl text-lg leading-relaxed text-mist">
            {over ? "Over " : ""}{years} years building web apps for real estate sales, HR and payroll, and live drone
            tracking. Django and Python on the server, Angular, React or Svelte in the browser, AWS and
            Terraform underneath, and Claude Code in my workflow.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" class="btn-primary">
              See my work
            </a>
            <a href="#contacts" class="btn-ghost">
              Get in touch
            </a>
          </div>

          <ul class="mt-10 flex items-center gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} profile (opens in new tab)`}
                  class="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-mist transition-colors hover:border-sky hover:text-white"
                >
                  <s.icon class="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The crescents echo the C in the logo. */}
        <div class="relative mx-auto aspect-square w-64 sm:w-80 md:w-full md:max-w-[26rem]">
          <svg viewBox="0 0 400 400" class="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="crescent-blue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#3fb2ff" />
                <stop offset="1" stop-color="#1a6fe6" />
              </linearGradient>
              <mask id="crescent-cut">
                <rect width="400" height="400" fill="white" />
                <circle cx="226" cy="196" r="180" fill="black" />
              </mask>
              <mask id="crescent-cut-thin">
                <rect width="400" height="400" fill="white" />
                <circle cx="212" cy="200" r="178" fill="black" />
              </mask>
            </defs>
            <circle class="crescent" cx="200" cy="200" r="196" fill="url(#crescent-blue)" mask="url(#crescent-cut)" />
            <g transform="rotate(-38 200 200)">
              <circle
                class="crescent crescent-late"
                cx="200"
                cy="200"
                r="186"
                fill="white"
                opacity="0.9"
                mask="url(#crescent-cut-thin)"
              />
            </g>
          </svg>
          <img
            src="/assets/images/cris-picture.webp"
            alt="Cris Jr. T. Fandiño"
            width={320}
            height={320}
            class="absolute inset-[15%] h-[70%] w-[70%] rounded-full object-cover object-[50%_12%] ring-1 ring-white/15"
          />
        </div>
      </div>
    </section>
  );
});
