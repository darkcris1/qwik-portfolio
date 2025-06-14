import { component$, useSignal, $ } from "@builder.io/qwik";
import type { Slide } from "yet-another-react-lightbox"; // Import Slide type
import { QwikLightbox } from "./ReactLightbox";
import { QwikTimelineProjectCard } from '../integrations/react/QwikTimelineProjectCard';
import ParticlesBackground from '../integrations/react/ParticlesBackground';
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
  lightboxImages?: Slide[]; // Formatted for yet-another-react-lightbox
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
    lightboxImages: [ // Prepare slides for the lightbox
      { src: "/assets/images/showcase/pdo-1.png", },
      { src: "/assets/images/showcase/pdo-2.png", },
      { src: "/assets/images/showcase/pdo-3.png", },
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
    lightboxImages: [ // Prepare slides for the lightbox
      { src: "/assets/images/showcase/hrms.png", },
      { src: "/assets/images/showcase/hrms-2.png", },
      { src: "/assets/images/showcase/hrms-3.png", },
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
    lightboxImages: [
      { src: "/assets/images/showcase/ems1.png", },
      { src: "/assets/images/showcase/ems2.webp",  },
      { src: "/assets/images/showcase/ems3.png",  },
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
    lightboxImages: [
      { src: "/assets/images/showcase/hms1.png", },
      { src: "/assets/images/showcase/hms2.webp", },
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
    lightboxImages: [
      { src: "/assets/images/showcase/tk-m-1.png", },
      { src: "/assets/images/showcase/tk-m-2.png", },
      { src: "/assets/images/showcase/tk-m-3.webp", },
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
    lightboxImages: [
      { src: "/assets/images/showcase/scrumban3.png", },
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
    lightboxImages: [
      { src: "/assets/images/showcase/scrumban.png", },
      { src: "/assets/images/showcase/scrumban2.png", },
      { src: "/assets/images/showcase/scrumban3.png", },
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
    lightboxImages: [
      { src: "/assets/images/showcase/scrumban3.png", },
    ],
  },
  
];

export default component$(() => {
  const isLightboxOpen = useSignal(false);
  // Store the slides for the currently active project's lightbox
  const currentLightboxSlides = useSignal<Slide[]>([]);
  // Store the index of the image to open in the lightbox
  const currentLightboxIndex = useSignal(0);

  const openLightbox = $((projectSlides: Slide[], index: number) => {
    currentLightboxSlides.value = projectSlides;
    currentLightboxIndex.value = index;
    isLightboxOpen.value = true;
  });

  const closeLightbox = $(() => {
    isLightboxOpen.value = false;
  });

  return (
    <>

    <section id="projects" class="relative w-full overflow-hidden py-16 my-15 md:px-32 px-4 bg-gray-50 max-w-[1280px]">
    <ParticlesBackground />
      
        <h2 class="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl font-bold bg-gradient-to-r  bg-clip-text text-transparent text-center">
            <span
              class="text-blue-700 animate-glow-medium"
            >
              Projects
            </span>
          </h2>
        {/* Central timeline line */}
        <div class="absolute  left-1/2 top-12 h-[94%] w-1 bg-gray-300 z-0" style={{ transform: 'translateX(-50%)' }}></div>
        <div class="mt-10">
          <div class="relative z-10 flex flex-col gap-16">
            {projectsData.slice(0,5).map((project, idx) => (
              <QwikTimelineProjectCard
                key={project.id}
                alignment={idx % 2 === 0 ? 'left' : 'right'}
                classes={`w-full flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} items-center relative`}
              >
                {/* Connecting line from card to center timeline */}
                <div
                  class={`bg-gray-300 h-1 absolute z-0 top-1/2 ${idx % 2 === 0 ? 'left-0' : 'right-0'} z-10`}
                  style={{
                    width: 'calc(100% - 630px)',
                    transform: 'translateY(-50%)',
                  }}
                ></div>
                {/* Card content here */}
                <div class="bg-white z-100 text-gray-800 p-6 md:p-8 rounded-lg shadow-2xl max-w-xl w-full border border-gray-200">
                  <h3 class="text-2xl font-bold mb-2 text-blue-700">{project.title}</h3>
                  <p class="text-sm text-gray-600 mb-1 font-semibold">Role: {project.role}</p>
                  <p class="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  <div class="mb-2">
                    <span class="text-sm font-semibold text-gray-700">Frameworks:&nbsp;</span>
                    {project.frameworks.map((fw, i) => (
                      <span key={i} class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2 text-xs font-medium">
                        {fw}
                      </span>
                    ))}
                  </div>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-block mb-3 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      Live Site
                    </a>
                  )}
                  <h4 class="text-lg font-semibold text-gray-700 mb-2">Preview Gallery</h4>
                  <div class="grid grid-cols-3 gap-2 mb-2">
                    {project.previewImages?.map((imgSrc, index) => (
                      <img
                        key={index}
                        src={imgSrc}
                        alt={`${project.title} preview ${index + 1}`}
                        width={120}
                        height={90}
                        loading="lazy"
                        class="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity border"
                        onClick$={() => openLightbox(project.lightboxImages || [], index)}
                      />
                    ))}
                  </div>
                </div>
              </QwikTimelineProjectCard>
            ))}
          </div>
          {isLightboxOpen.value && (
            <QwikLightbox
              open={isLightboxOpen.value}
              close={closeLightbox}
              slides={currentLightboxSlides.value}
            />
          )}

        </div>
          
        <ArchiveProjects projects={projectsData.slice(5)}></ArchiveProjects>
      </section>
    </>
  );
});
