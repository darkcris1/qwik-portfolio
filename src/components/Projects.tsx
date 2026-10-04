import { component$, useSignal, $ } from "@qwik.dev/core";
import { Lightbox } from "./Lightbox";
import { TimelineCard } from './TimelineCard';
import { ArchiveProjects } from "~/integrations/react/ArchiveProjects";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  liveLink?: string;
  frameworks: string[];
  mainImage: string;
  previewImages?: string[]; // URLs for small previews
}

const projectsData: Project[] = [
  {
    id: "pdo",
    title: "Pueblo De Oro (PDO) - System",
    description:
      "Streamline the process of buying a property in the Philippines. It's a web application that allows users to manage agents, properties, and clients.",
    role: "Full Stack Developer",
    frameworks: ["Angular", "Python", "Django", "SCSS"],
    liveLink: 'https://pueblodeoro.com',
    mainImage: "/assets/images/showcase/pdo-1.png",
    previewImages: [
      "/assets/images/showcase/pdo-1.png",
      "/assets/images/showcase/pdo-2.png",
      "/assets/images/showcase/pdo-3.png",
    ],
  },
  {
    id: "hrms",
    title: "Human Resource Management System (HRMS)",
    description:
      "An internal application to streamline employee data management, payroll, attendance, and performance reviews. Focused on creating a scalable backend and an intuitive frontend interface.",
    role: "Full Stack Developer",
    frameworks: ["Angular", "Python", "Django", "SCSS"],
    mainImage: "/assets/images/showcase/hrms.png",
    previewImages: [
      "/assets/images/showcase/hrms.png",
      "/assets/images/showcase/hrms-2.png",
      "/assets/images/showcase/hrms-3.png",
    ],
  },
  
  {
    id: "ems",
    title: "Emergency Management System (EMS)",
    liveLink: 'https://optixvue.com',
    description:
      "A web application for managing emergency drone live tracking, reporting, and analysis. That allows users to track and monitor drone flights in real-time.",
    role: "Full Stack Developer",
    frameworks: ["Angular", "Python", "Django", "SCSS"],
    mainImage: "/assets/images/showcase/ems1.png",
    previewImages: [
      "/assets/images/showcase/ems1.png",
      "/assets/images/showcase/ems2.webp",
      "/assets/images/showcase/ems3.png",
    ],
  },
  {
    id: "hmkey",
    title: "HomeKey",
    description:
      "HomeKey connects real estate developers and lenders with balikbayan home buyers in the Philippines",
    role: "Full Stack Developer",
    liveLink: 'https://www.homekey.com.ph',
    frameworks: ["Angular/Ionic", "Python", "Django", "SCSS"],
    mainImage: "/assets/images/showcase/tk-m-1.png",
    previewImages: [
      "/assets/images/showcase/hms1.png",
      "/assets/images/showcase/hms2.webp",
    ],
  },
  {
    id: "p2p-marketplace",
    title: "Peer-to-Peer Marketplace",
    description:
      "A web application for for taskers and service providers to connect with each other. It's a web application that allows users to create and manage projects, tasks, and sprints",
    role: "Full Stack Developer",
    liveLink: 'https://test.sarwisi.com',
    frameworks: ["Angular", "Python", "Django", "Tailwind"],
    mainImage: "/assets/images/showcase/tk-m-1.png",
    previewImages: [
      "/assets/images/showcase/tk-m-1.png",
      "/assets/images/showcase/tk-m-2.png",
      "/assets/images/showcase/tk-m-3.webp",
    ],
  },
  {
    id: "dataconnect-tracker",
    title: "DataConnect Tracker",
    description:
      "Its a web application that will track agent location in real time and visualize their route on a map and also review their performance",
    role: "Full Stack Developer",
    liveLink: 'https://tracker.dataconnect.com.ph',
    frameworks: ["Flutter", "Python", "Django"],
    mainImage: "/assets/images/showcase/scrumban.png",
    previewImages: [
      "/assets/images/showcase/scrumban3.png",
    ],
  },
  {
    id: "scrumban",
    title: "ScrumBan",
    description:
      "An internal project management tool for small teams. It's a web application that allows users to create and manage projects, tasks, and sprints",
    role: "Full Stack Developer",
    frameworks: ["Angular", "Python", "Django", "SCSS"],
    mainImage: "/assets/images/showcase/scrumban.png",
    previewImages: [
      "/assets/images/showcase/scrumban.png",
      "/assets/images/showcase/scrumban2.png",
      "/assets/images/showcase/scrumban3.png",
    ],
  },
  {
    id: "checksuite",
    title: "CheckSuite",
    description:
      "Users could create and customize their own check templates on a digital canvas, with automatic data interpolation",
    role: "Full Stack Developer",
    frameworks: ["Angular", "Python", "Django", "Tailwind"],
    mainImage: "/assets/images/showcase/scrumban.png",
    previewImages: [
      "/assets/images/showcase/scrumban3.png",
    ],
  },
  
];

export default component$(() => {
  const lightbox = useSignal<{ title: string; images: string[]; index: number } | null>(null);

  const openLightbox = $((title: string, images: string[], index: number) => {
    lightbox.value = { title, images, index };
  });

  const closeLightbox = $(() => {
    lightbox.value = null;
  });

  return (
    <section id="projects" class="w-full overflow-x-clip bg-white">
      <div class="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <p class="eyebrow">Selected work</p>
        <h2 class="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
          Systems I've built for real businesses.
        </h2>

        <div class="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
          {projectsData.slice(0, 5).map((project, idx) => (
            <TimelineCard key={project.id} alignment={idx % 2 === 0 ? "left" : "right"}>
              <article class="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div class={idx % 2 === 1 ? "md:order-2" : ""}>
                  <div class="overflow-hidden rounded-2xl border border-line bg-ice shadow-2xl shadow-ink/10">
                    <div class="flex items-center gap-1.5 border-b border-line bg-white px-4 py-2.5">
                      <span class="h-2.5 w-2.5 rounded-full bg-line" />
                      <span class="h-2.5 w-2.5 rounded-full bg-line" />
                      <span class="h-2.5 w-2.5 rounded-full bg-line" />
                      <span class="ml-3 truncate font-mono text-[11px] text-muted">
                        {project.liveLink ? new URL(project.liveLink).host : "internal tool"}
                      </span>
                    </div>
                    <button
                      type="button"
                      class="group block w-full cursor-zoom-in overflow-hidden"
                      aria-label={`Open ${project.title} screenshots`}
                      data-index={0}
                      // Capturing the map index in slotted content hangs Qwik v2 rc.0 SSR.
                      onClick$={(_, el) => openLightbox(project.title, project.previewImages?.length ? project.previewImages : [project.mainImage], Number(el.dataset.index))}
                    >
                      <img
                        src={project.previewImages?.[0] ?? project.mainImage}
                        alt=""
                        width={640}
                        height={400}
                        loading="lazy"
                        class="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>
                  </div>
                  {(project.previewImages?.length ?? 0) > 1 && (
                    <ul class="mt-4 flex gap-3">
                      {project.previewImages!.map((imgSrc, index) => (
                        <li key={imgSrc}>
                          <button
                            type="button"
                            class="block overflow-hidden rounded-lg border border-muted/35 bg-white p-1 shadow-sm shadow-ink/10 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                            aria-label={`Open ${project.title} screenshot ${index + 1}`}
                            data-index={index}
                            onClick$={(_, el) => openLightbox(project.title, project.previewImages?.length ? project.previewImages : [project.mainImage], Number(el.dataset.index))}
                          >
                            <img src={imgSrc} alt="" width={96} height={60} loading="lazy" class="h-12 w-20 rounded-md object-cover object-top md:h-14 md:w-24" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-ink">{project.role}</p>
                  <h3 class="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink md:text-3xl">
                    {project.title}
                  </h3>
                  <p class="mt-4 leading-relaxed text-muted">{project.description}</p>
                  <ul class="mt-6 flex flex-wrap gap-2" aria-label="Built with">
                    {project.frameworks.map((fw) => (
                      <li key={fw} class="rounded-md border border-line bg-ice px-2.5 py-1 font-mono text-xs text-ink/80">
                        {fw}
                      </li>
                    ))}
                  </ul>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-7 inline-flex items-center gap-1.5 font-semibold text-brand-ink underline-offset-4 hover:underline"
                    >
                      Visit live site <span aria-hidden="true">↗</span>
                      <span class="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </TimelineCard>
          ))}
        </div>

        {lightbox.value && (
          <Lightbox
            title={lightbox.value.title}
            images={lightbox.value.images}
            startIndex={lightbox.value.index}
            onClose$={closeLightbox}
          />
        )}

        <ArchiveProjects projects={projectsData.slice(5)} />
      </div>
    </section>
  );
});
