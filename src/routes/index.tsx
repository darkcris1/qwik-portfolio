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
import { useSignal } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { motion, AnimatePresence as AP } from "motion/react";

const MotionDiv = qwikify$(motion.div)
const AnimatePresence = qwikify$(AP)

// Define the action to handle the POST request
export const useMyAction = routeAction$(async (data, { fail }) => {
  return handleContactForm(data, fail)
});


export default component$(() => {
  const action = useMyAction();
  const navOpen = useSignal(false);

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col items-center relative">
      <Home />
      <About />
      <Projects />
      <ToolsFrameworks />
      <Contacts action={action} />
      {/* Burger menu button for mobile */}
      <div class="fixed h-[70px] z-[50] w-full top-4 left-4 flex flex-row items-center gap-2">
        <button
          class="z-[100] sm:block md:hidden bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all"
          aria-label="Open navigation menu"
          onClick$={() => (navOpen.value = !navOpen.value)}
        >

          { !navOpen.value && <MenuIcon class="w-8 h-8 text-gray-700" />}
          { navOpen.value && <XIcon class="w-8 h-8 text-gray-700" />}
          
        </button>
        {/* Modal overlay for mobile nav */}
        <AnimatePresence>
          {navOpen.value && (
            <MotionDiv 
              key="modal"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}>
              <div class="flex flex-row bg-white shadow-lg rounded-full px-6 py-3 gap-6 md:gap-8 border border-gray-200">
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
                <a href="#tools-frameworks" data-scrollto="tools-frameworks" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  <CpuIcon class="w-6 h-6" />
                  <span class="text-xs mt-1">Tools</span>
                </a>
                <a href="#contacts" data-scrollto="contacts" class="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  <MailIcon class="w-6 h-6" />
                  <span class="text-xs mt-1">Contacts</span>
                </a>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop/Tablet sidebar nav */}
      <nav class="fixed top-1/2 left-6 -translate-y-1/2 z-50 hidden md:block">
        <div class="flex flex-col backdrop-blur-md bg-white shadow-lg rounded-full px-3 py-6 gap-6 md:gap-8 border border-white/20 transition-all duration-300 animate-fadeInUp">
          <a href="#home" data-scrollto="home" class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <HomeIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Home</span>
          </a>
          <a href="#about" data-scrollto="about" class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <UserIcon class="w-6 h-6" />
            <span class="text-xs mt-1">About</span>
          </a>
          <a href="#projects" data-scrollto="projects" class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <FolderIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Projects</span>
          </a>
          <a href="#tools-frameworks" data-scrollto="tools-frameworks" class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <CpuIcon class="w-6 h-6" />
            <span class="text-xs mt-1">Tools</span>
          </a>
          <a href="#contacts" data-scrollto="contacts" class="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
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
