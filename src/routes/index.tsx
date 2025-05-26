import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HomeIcon, UserIcon, FolderIcon, MailIcon, CpuIcon } from "qwik-feather-icons"; // Added CpuIcon
import Home from "~/components/Home";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Contacts from "~/components/Contacts";
import ToolsFrameworks from "~/components/ToolsFrameworks"; // Import the new component
import { routeAction$ } from '@builder.io/qwik-city';
import { handleContactForm } from "~/lib/hooks/contact-api";


// Define the action to handle the POST request
export const useMyAction = routeAction$(async (data, { fail }) => {
  return handleContactForm(data, fail)
});


export default component$(() => {
  const action = useMyAction();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (typeof window !== "undefined") {
      document.querySelectorAll("[data-scrollto]").forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.getElementById(el.getAttribute("data-scrollto")!);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  });

  return (
    <div class="min-h-screen bg-white flex flex-col items-center relative"> {/* Added relative positioning to parent if needed for absolute child positioning, though fixed should work independently */} 
      <Home />
      <About />
      <Projects />
      <ToolsFrameworks /> {/* Add the new component here */}
      <Contacts action={action} />
      <nav class="fixed top-1/2 left-6 -translate-y-1/2 z-50">
        {/* Changed from flex to flex-col for vertical stacking of nav items */}
        <div class="flex flex-col bg-white shadow-lg rounded-full px-3 py-6 gap-6 md:gap-8 border border-gray-200 transition-all duration-300 animate-fadeInUp">
          <a href="#home" data-scrollto="home" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <HomeIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Home</span>
          </a>
          <a href="#about" data-scrollto="about" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <UserIcon class="w-6 h-6" />
            <span class="text-xs mt-1">About</span>
          </a>
          <a href="#projects" data-scrollto="projects" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <FolderIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Projects</span>
          </a>
          {/* Add new navigation item for Tools & Frameworks */}
          <a href="#tools-frameworks" data-scrollto="tools-frameworks" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <CpuIcon class="w-6 h-6" /> {/* Using CpuIcon as an example, you can change it */}
            <span class="text-xs mt-1">Tools</span>
          </a>
          <a href="#contacts" data-scrollto="contacts" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <MailIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Contacts</span>
          </a>
        </div>
      </nav>
      <footer class="w-full py-4 bg-gray-900 border-t text-center text-gray-100 text-sm z-40">
        © {new Date().getFullYear()} Cris Jr. T. Fandiño. All rights reserved.
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Cris Jr. T. Fandiño | Portfolio",
  meta: [
    {
      name: "description",
      content: "Portfolio of Cris Jr. T. Fandiño, Fullstack Developer specializing in Django, Python, JS, Svelte, React, Postgres, Redis, Docker, Nginx.",
    },
  ],
};
