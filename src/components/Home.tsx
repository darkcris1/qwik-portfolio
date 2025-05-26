import { component$ } from "@builder.io/qwik";
import { LinkedinIcon, GithubIcon, CodeIcon } from "qwik-feather-icons";

export default component$(() => {
  return (
    <section id="home" class="w-full max-w-xl mx-auto py-16 px-4 flex flex-col items-center">
      <img
        src="/assets/images/cris-picture.JPG"
        alt="Cris Jr. T. Fandiño"
        class="rounded-full border-4 border-white shadow-lg mb-4"
        loading="lazy"
        width={120}
        height={120}
      />
      <h1 class="text-3xl font-bold mb-2 text-gray-900 text-center">Cris Jr. T. Fandiño</h1>
      <p class="text-lg text-gray-600 text-center mb-2">Fullstack Developer</p>
      <p class="text-center text-gray-500">4 years of experience specializing in Django, Python, JS, Svelte, React, Postgres, Redis, Docker, Nginx.</p>
      <div class="flex items-center space-x-4 mt-4">
        <a
          href="https://www.linkedin.com/in/cris-jr-fandi%C3%B1o-9b3944149/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-blue-700 transition-colors"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon class="w-7 h-7 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:rotate-6" />
        </a>
        <a
          href="https://github.com/darkcris1"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="GitHub Profile"
        >
          <GithubIcon class="w-7 h-7 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:-rotate-6" />
        </a>
        <a
          href="https://www.codewars.com/users/darkcris1"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-red-600 transition-colors"
          aria-label="Codewars Profile"
        >
          <CodeIcon class="w-7 h-7 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:rotate-12" />
        </a>
      </div>
    </section>
  );
});