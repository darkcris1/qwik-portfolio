import { component$ } from "@qwik.dev/core";
import { AnimatedTools } from "./AnimatedToolsQwik";

const tools = [
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg", alt: "bootstrap" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", alt: "html5" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", alt: "css3" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", alt: "tailwind" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg", alt: "sass" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", alt: "react" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg", alt: "svelte" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg", alt: "angular" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", alt: "javascript" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", alt: "typescript" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg", alt: "nodejs" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", alt: "mongodb" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", alt: "git" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg", alt: "npm" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/yarn/yarn-original-wordmark.svg", alt: "yarn" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", alt: "django" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", alt: "python" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-original.svg", alt: "ubuntu" },
  { src: "https://github.com/devicons/devicon/raw/master/icons/vscode/vscode-original.svg", alt: "vscode" },
  { src: "https://github.com/devicons/devicon/raw/master/icons/jira/jira-original.svg", alt: "jira" },
  { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", alt: "postgresql" },
];

// Each row drifts in from a different side as the section scrolls into view.
const rows = [
  { items: tools.slice(0, 7), xDistance: -200 },
  { items: tools.slice(7, 14), xDistance: 140 },
  { items: tools.slice(14, 21), xDistance: -120 },
];

export default component$(() => {
  return (
    <section id="tools-frameworks" class="relative isolate w-full overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-72 left-1/2 -z-10 h-[40rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(26_111_230/0.22),transparent)]"
      />
      <div class="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <p class="eyebrow text-sky">Stack</p>
        <h2 class="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          The tools I build with.
        </h2>

        <div class="mt-14 flex flex-col gap-4 md:gap-6">
          {rows.map((row, i) => (
            <AnimatedTools key={i} xDistance={row.xDistance}>
              <ul class="flex justify-center gap-1.5 sm:gap-4">
                {row.items.map((tool) => (
                  <li key={tool.alt} class="flex flex-col items-center gap-2">
                    <span class="grid h-[min(11vw,2.75rem)] w-[min(11vw,2.75rem)] place-items-center rounded-xl bg-ice ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 sm:h-16 sm:w-16 md:h-20 md:w-20 md:rounded-2xl">
                      <img src={tool.src} alt="" width={40} height={40} loading="lazy" decoding="async" class="h-[55%] w-[55%] sm:h-9 sm:w-9 md:h-10 md:w-10" />
                    </span>
                    <span class="hidden font-mono text-[11px] text-mist sm:block">{tool.alt}</span>
                    <span class="sr-only sm:hidden">{tool.alt}</span>
                  </li>
                ))}
              </ul>
            </AnimatedTools>
          ))}
        </div>
      </div>
    </section>
  );
});
